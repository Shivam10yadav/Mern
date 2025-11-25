import express from 'express'
import protect from '../middlewares/authMiddleware.js';
import { createResume, deletResume, getPublicResumeById, getResumeById, updateResume } from '../controllers/resumeController.js';
import upload from '../Configs/multer.js';

const resumeRouter=express.Router();

resumeRouter.post('/create',protect,createResume)
resumeRouter.put('/update', protect, upload.single('image'), updateResume)
resumeRouter.delete('/delete/:resumeId',protect,deletResume)
resumeRouter.get('/get/:resumeId',protect,getResumeById)
resumeRouter.get('/public/:resumeId',protect,getPublicResumeById)

export default resumeRouter;

