import mongoose from "mongoose";

const connectDb=async () => {
    try {
        mongoose.connection.on("connected",()=>{console.log("Database connected successfully")})
        
        let mongodbURI=process.env.MONGODB_URI;
        const projectName='resume-builder';

        if(!mongodbURI){
            throw new Error("mongodb_uri environment variable not set")
        }

        if(mongodbURI.endsWith('/')){
            mongodbURI=mongodbURI.slice(0,-1)
        }

        await mongoose.connect(`${mongodbURI}/${projectName}`)
    } catch (error) {
        console.error("error connecting to MongoDB :", error )
    }
    
}

export default connectDb;