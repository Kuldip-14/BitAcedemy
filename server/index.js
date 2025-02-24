import express from 'express';
import dotenv from  'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import connectDB from "./database/db.js";
import userRouter from "./routes/user.route.js"
dotenv.config({});
const app = express();

// Call Database connection here
connectDB();
const PORT = process.env.PORT||3000;

// default Middleware
app.use(express.json());
app.use(cookieParser());

app.use(cors({
     origin:"http://localhost:5173",
     credentials:true
}));

//Apis
app.use("/api/v1/user", userRouter)

 "http://localhost:8080/api/v1/user/register"
 "http://localhost:8080/api/v1/user/login"


app.listen(PORT, () => {
     console.log(`Server listen at port ${PORT}`);
     
});