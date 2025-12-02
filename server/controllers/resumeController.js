//controller for creating a new resumes
//post://api/resumes/create

import imageKit from "../Configs/imageKit.js";
import Resume from "../models/resume.js";
import fs from 'fs'
import mongoose from "mongoose";

export const createResume = async (req, res) => {
  try {
    const userId = req.userId;
    const { title } = req.body;

    //create new resume

    const newResume = await Resume.create({ userId, title });
    return res
      .status(201)
      .json({ message: "Resume created successfully", resume: newResume });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};
//controller for deleting
// delete:/api/resume/delete

export const deletResume = async (req, res) => {
  try {
    const userId = req.userId;
    const { resumeId } = req.params;

    //create new resume

    await Resume.findOneAndDelete({ userId, _id: resumeId });
    return res.status(200).json({ message: "Resume deleted successfully" });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

export const getResumeById = async (req, res) => {
  try {
    const userId = req.userId;
    const { resumeId } = req.params;

    const resume = await Resume.findOne({ userId, _id: resumeId });
    
    if (!resume) {
      return res.status(404).json({ message: "Resume not found" });
    }

    // Remove unnecessary fields
    const resumeData = resume.toObject();
    delete resumeData.__v;
    delete resumeData.createdAt;
    delete resumeData.updatedAt;

    return res.status(200).json({ resume: resumeData });
    
  } catch (error) {
    console.error("Get Resume Error:", error);
    return res.status(500).json({ message: error.message });
  }
};

//et resume by id public
//get:/api/resumes/public

export const getPublicResumeById = async (req, res) => {
  try {
    const { resumeId } = req.params;

    // Find resume that is public
    const resume = await Resume.findOne({ 
      _id: resumeId, 
      public: true  // ✅ Only return if resume is public
    });

    if (!resume) {
      return res.status(404).json({ message: "Resume not found or not public" });
    }

    // Remove unnecessary fields
    const resumeData = resume.toObject();
    delete resumeData.__v;
    delete resumeData.createdAt;
    delete resumeData.updatedAt;
    delete resumeData.userId;  // Don't expose user ID

    return res.status(200).json({ resume: resumeData });
    
  } catch (error) {
    console.error("Get Public Resume Error:", error);
    return res.status(500).json({ message: error.message });
  }
};

// controller for updating a resume
//put:/api/resume/update

// Add this to resumeController.js
export const updateResume = async (req, res) => {
  try {
    const userId = req.userId;
    const { resumeid, resumedata, removebackground } = req.body;
    const image = req.file;

    // 1️⃣ Validate resumeid
    if (!resumeid || !mongoose.Types.ObjectId.isValid(resumeid)) {
      return res.status(400).json({ message: "Invalid or missing Resume ID" });
    }

    // 2️⃣ Parse resumedata
    let resumeDataCopy = {};
    if (resumedata) {
      if (typeof resumedata === "string") {
        try {
          resumeDataCopy = JSON.parse(resumedata);
        } catch {
          return res.status(400).json({ message: "Invalid resume data JSON" });
        }
      } else {
        resumeDataCopy = structuredClone(resumedata);
      }
    }

    // 3️⃣ AGGRESSIVE FIX: Remove ALL _id and empty string values
    const cleanData = (obj) => {
      if (Array.isArray(obj)) {
        return obj.map(item => cleanData(item)).filter(item => item !== null);
      } else if (obj && typeof obj === 'object') {
        const newObj = {};
        for (const key in obj) {
          // Skip _id fields completely
          if (key === '_id') continue;
          
          const value = obj[key];
          
          // Skip empty strings
          if (value === '' || value === null || value === undefined) continue;
          
          // Recursively clean nested objects/arrays
          if (typeof value === 'object') {
            const cleaned = cleanData(value);
            if (cleaned !== null && cleaned !== undefined) {
              newObj[key] = cleaned;
            }
          } else {
            newObj[key] = value;
          }
        }
        return newObj;
      }
      return obj;
    };

    resumeDataCopy = cleanData(resumeDataCopy);

    // 4️⃣ DEBUG: Log the cleaned data
    console.log('🧹 Cleaned Data:', JSON.stringify(resumeDataCopy, null, 2));

    // 5️⃣ Ensure arrays exist
    resumeDataCopy.personal_info = resumeDataCopy.personal_info || {};
    resumeDataCopy.skills = Array.isArray(resumeDataCopy.skills) ? resumeDataCopy.skills : [];
    resumeDataCopy.experience = Array.isArray(resumeDataCopy.experience) ? resumeDataCopy.experience : [];
    resumeDataCopy.project = Array.isArray(resumeDataCopy.project) ? resumeDataCopy.project : [];
    resumeDataCopy.education = Array.isArray(resumeDataCopy.education) ? resumeDataCopy.education : [];

    // 6️⃣ Handle image upload
    if (image) {
      try {
        const imageBufferData = fs.createReadStream(image.path);
        const response = await imageKit.upload({
          file: imageBufferData,
          fileName: "resume.png",
          folder: "user-resumes",
          transformation: {
            pre: "w-300,h-300,fo-face,z-0.75" + (removebackground ? ",e-bgremove" : "")
          }
        });

        resumeDataCopy.personal_info.image = response.url;
        fs.unlinkSync(image.path);
      } catch (err) {
        console.error("Image upload failed:", err);
        if (image.path && fs.existsSync(image.path)) {
          fs.unlinkSync(image.path);
        }
        return res.status(500).json({ message: "Failed to upload image" });
      }
    }

    // 7️⃣ Update with replaceOne instead to avoid _id issues
    const updatedResume = await Resume.findOne({ _id: resumeid, userId });
    
    if (!updatedResume) {
      return res.status(404).json({ message: "Resume not found" });
    }

    // Manually update fields to avoid Mongoose casting issues
    Object.keys(resumeDataCopy).forEach(key => {
      updatedResume[key] = resumeDataCopy[key];
    });

    await updatedResume.save();

    return res.status(200).json({ 
      message: "Resume saved successfully", 
      resume: updatedResume 
    });

  } catch (error) {
    console.error("Update Resume Error:", error);
    return res.status(500).json({ 
      message: "Unexpected server error while saving resume",
      error: error.message 
    });
  }
};