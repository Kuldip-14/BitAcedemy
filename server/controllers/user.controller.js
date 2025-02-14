import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fileds are required",
      });
    }
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({
        success: false,
        message: "User already exists: Please try with another email",
      });
    }
    const hashedPassword = await bcrypt.hash(password, 12);
    await User.create({
      name,
      email,
      password: hashedPassword,
    });
    return res.status(201).jason({
      success: true,
      message: "User registered Successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).jason({
      success: false,
      message: " Failed to register user"
    });
  }
};

export const login = async (req, res)=>{
    try {
        const {email, password} = req.body;
        if(!email || !password){
            return res.status(400).jason({
                success: false,
                message: "All fields are required"
            })
        }
        const user = await User.findOne({email});
        if(!user){
            return res.status(400).jason({
                success: false,
                message: "Incorrect email or password"
            });
        }
        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if(!isPasswordMatch){
            return res.status(400).jason({
                success: false,
                message: "Incorrect email or password"
            });
        }
        generateToken(res, user, `Welcome back ${user.name}`);
        
    } catch (error) {
        console.log(error);
        return res.status(500).jason({
            success: false,
            message: "Failed to Login user"
        })
    }
}
