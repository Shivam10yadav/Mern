import User from "../models/User.js"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import Resume from "../models/resume.js";

const generateToken = (userId) => {
    return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '7d' });
};

// REGISTER USER
export const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Check fields
        if (!name || !email || !password) {
            return res.status(400).json({ message: 'Missing required fields' });
        }

        // Check if user exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create user
        const newUser = await User.create({
            name,
            email,
            password: hashedPassword
        });

        const token = generateToken(newUser._id);
        newUser.password = undefined;

        return res.status(200).json({
            message: 'User created successfully',
            token,
            user: newUser
        });

    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
};



//controller for userlogin
//  //post:/api/users/login
// LOGIN USER
export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        // Compare password
        const isMatch = user.comparePassword(password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        const token = generateToken(user._id);
        user.password = undefined;

        return res.status(200).json({
            message: 'Login successful',
            token,
            user
        });

    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
};

//controller for getting user by id
//get:/api/users/data
export const getUserById=async(req,res)=>{

    try {
        const userId=req.userId
        //check if user exists

        const user=await User.findById(userId)
        if(!user){
            return res.status(404).json({message:'User not found'})
        }
        //retrun user

        User.password=undefined;
        return res.status(200).json({user})

    } catch (error) {
        return res.status(400).json({message:error.message})
        
    }

}

//controller for getting user resume
//get:/api/users/resumes
export const getUserResumes=async(req,res)=>{
    try {
        const userId=req.userId;
        //retrun user resumes

        const resumes=await Resume.find({userId})
        return res.status(200).json({resumes})
    } catch (error) {
        return res.status(400).json({message:error.message})
    }
}
