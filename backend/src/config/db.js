import mongoose from "mongoose"

const connectDB = async () => {
    try{
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connect successfully");
    }catch(error){
        console.log("Connect fail");
        process.exit(1);
    }
}
export default connectDB;