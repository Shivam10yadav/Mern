//controller for creating a new resumes
//post://api/resumes/create

import imageKit from "../Configs/imageKit.js";
import Resume from "../models/resume.js";
import fs from 'fs'

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

    //create new resume

    const resume = await Resume.findOne({ userId, _id: resumeId });
    if (!resume) {
      return res.status(404).json({ message: "Resume not found" });
    }

    resume._y = undefined;
    resume.createdAt = undefined;
    resume.updatedAt = undefined;
    return res.status(200).json({ message: { resume } });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

//et resume by id public
//get:/api/resumes/public

export const getPublicResumeById = async (req, res) => {
  try {
    const { resumeId } = req.params;
    const resume = await Resume.findOne({ public: true, _id: resumeId });
    if (!resume) {
      return res.status(404).json({ message: "Resume not found" });
    }
    return res.status(200).json({ resume });
  } catch (error) {
    return res.status(400).json({ message: error.message });
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

    if (!resumeid) {
      return res.status(400).json({ message: 'Resume ID is required' });
    }

    let resumeDataCopy;
    if(typeof resumedata === 'string'){
      resumeDataCopy = JSON.parse(resumedata);
    } else {
      resumeDataCopy = structuredClone(resumedata);
    }

    if (image) {
      const imageBufferData = fs.createReadStream(image.path);
      const response = await imageKit.upload({
        file: imageBufferData,
        fileName: "resume.png",
        folder: 'user-resumes',
        transformation: {
          pre: "w-300,h-300,fo-face,z-0.75" + (removebackground ? ',e-bgremove' : '')
        }
      });
      resumeDataCopy.personal_info.image = response.url;
    }

    // Use $set to update only the fields provided, keeping title intact
    const resume = await Resume.findOneAndUpdate(
      { userId, _id: resumeid },
      { $set: resumeDataCopy },  // ✅ Changed: Use $set operator
      { new: true }
    );

    if (!resume) {
      return res.status(404).json({ message: 'Resume not found' });
    }

    return res.status(200).json({ message: "Saved successfully", resume });
  } catch (error) {
    console.error('Update Resume Error:', error);
    return res.status(400).json({ message: error.message });
  }
};