//cotroller for enhancing a resume's proffesonal summary
//post:/api/ai/enhance-pro-sum

import { response } from "express";
import Resume from "../models/resume.js";
import ai from "../Configs/ai.js";

export const enhanceProfessionalSummary = async (req, res) => {
  try {
    const { userContent } = req.body;

    if (!userContent) {
      return res.status(400).json({ message: "missing required fields" });
    }
    const response = await ai.chat.completions.create({
      model: process.env.OPEN_AI_MODEL,
      messages: [
        {
          role: "system",
          content:
            "You are an expert in resume writing.Your task is to enhance the profesional summary of a resume. The summary should be 1-2 sentences also highlighting key skills,experience, and career objectives. Make it compeiling and ATS-friendly. and only return text no options or anything else.",
        },
        {
          role: "user",
          content: userContent,
        },
      ],
    });
    const enhancedContent = response.choices[0].message.content;
    return res.status(200).json({ enhancedContent });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

////cotroller for enhancing a resume's job-description summary
//post:/api/ai/enhance-job-desc

export const enhanceJobDescription = async (req, res) => {
  try {
    const { userContent } = req.body;

    if (!userContent) {
      return res.status(400).json({ message: "missing required fields" });
    }
    const response = await ai.chat.completions.create({
      model: process.env.OPEN_AI_MODEL,
      messages: [
        {
          role: "system",
          content:
            "You are an expert in resume writing.Your task is to enhance the job description of a resume. The job description should be 1-2 sentences also highlighting key responsibility and achievments. Use action verbs and quantifiable results where possible. Make it compeiling and ATS-friendly. and only return text no options or anything else.",
        },
        {
          role: "user",
          content: userContent,
        },
      ],
    });
    const enhancedContent = response.choices[0].message.content;
    return res.status(200).json({ enhancedContent });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

//controller for uploading a resume to the database
//post:/api/ai/upload-resume

export const uploadResume = async (req, res) => {
  try {
    console.log('=== Upload Resume Started ===')
    
    const { resumeText, title } = req.body;
    const userId = req.userId;

    console.log('User ID:', userId)
    console.log('Title:', title)
    console.log('Resume Text Length:', resumeText?.length)
    console.log('Resume Text Preview:', resumeText?.substring(0, 200))

    if (!resumeText) {
      console.log('ERROR: Missing resumeText')
      return res.status(400).json({ message: "Missing required fields" });
    }

    if (!userId) {
      console.log('ERROR: Missing userId')
      return res.status(401).json({ message: "Unauthorized" });
    }

    console.log('=== Checking Gemini Config ===')
    console.log('API Key exists:', !!process.env.OPENAI_API_KEY)
    console.log('API Key prefix:', process.env.OPENAI_API_KEY?.substring(0, 8))
    console.log('Model:', process.env.OPEN_AI_MODEL)

    console.log('Calling Gemini API...')

    const model = ai.getGenerativeModel({ 
      model: process.env.OPEN_AI_MODEL,
      generationConfig: { 
        responseMimeType: "application/json" 
      }
    });

    const prompt = `You are an expert AI Agent to extract data from resume.

Extract data from this resume: ${resumeText}

Provide data in the following JSON format with no additional text:

{
  "professional_summary": "",
  "skills": [],
  "personal_info": {
    "image": "",
    "full_name": "",
    "profession": "",
    "email": "",
    "phone": "",
    "location": "",
    "linkedin": "",
    "website": ""
  },
  "experience": [
    {
      "company": "",
      "position": "",
      "start_date": "",
      "end_date": "",
      "description": "",
      "is_current": false
    }
  ],
  "project": [
    {
      "name": "",
      "type": "",
      "description": ""
    }
  ],
  "education": [
    {
      "institution": "",
      "degree": "",
      "field": "",
      "graduation_date": "",
      "gpa": ""
    }
  ]
}`;

    const result = await model.generateContent(prompt);
    const extractedData = result.response.text();
    const parsedData = JSON.parse(extractedData);
    
    console.log('Creating resume in database...')
    const newResume = await Resume.create({ userId, title, ...parsedData });
    
    console.log('Resume created successfully:', newResume._id)
    console.log('=== Upload Resume Completed ===')
    
    res.json({ resume: { _id: newResume._id } });
  } catch (error) {
    console.error('=== Upload Resume ERROR ===')
    console.error('Error Name:', error.name)
    console.error('Error Message:', error.message)
    console.error('Error Stack:', error.stack)
    return res.status(400).json({ message: error.message });
  }
};