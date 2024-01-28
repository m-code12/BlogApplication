import User from "../model/user.js";
import bcrypt from "bcrypt";
import env from "dotenv";
import generateToken from "../Utils/generateToken.js";
import Token from "../model/token.js";
env.config();

/*Call back function for the post method */
export const signupUser = async (req, res) => {
  try {
    //checking username already exists or not
    const isUserExists = await User.findOne({ userName: req.body.userName });
    if (isUserExists)
      return res.status(400).json({
        error: true,
        message: "userName already exists",
      });
    //checking whether the email already exists or not
    const isEmailExists = await User.findOne({ email: req.body.email });
    if (isEmailExists)
      return res.status(400).json({
        error: true,
        message: "Email already exists",
      });
    const userData = req.body;
    //generating random string to append before Password hash
    const salt = await bcrypt.genSalt(10);
    /*This will create a encrypted password by appending the generated 
  salt to the password hash*/
    const hashedPassword = await bcrypt.hash(userData.password, salt);
    //Changing the password to hashed password
    userData.password = hashedPassword;
    const newUser = new User(userData);
    //saving the newUser Data to database,this is a asyncronus function
    const isUserSaved = await newUser.save();
    if (isUserSaved) {
      return res.status(200).json({
        message: "Signup Successful,Please Login",
      });
    } else
      return res.status(400).json({
        message: "Signup Unsuccessful",
      });
  } catch (error) {
    return res.status(400).json({
      error: true,
      message: "Some Fields are Missing",
    });
  }
};

/*named export */
export const loginUser = async (req, res) => {
  try {
    //Checking userName exists or not
    const user = await User.findOne({ userName: req.body.userName });
    //If user doesn't exists
    if (!user) {
      return res.status(400).json({
        message: "UserName Doesn't exists",
      });
    }
    //comparing the hashed password with the password provided
    const isPasswordMatched = await bcrypt.compare(
      req.body.password,
      user.password
    );
    //If password doesn't matches
    if (!isPasswordMatched)
      return res.status(400).json({
        message: "password didn't match",
      });

    const payload = {
      userName: user.userName,
      password: user.password,
      email: user.email,
      userId: user._id,
    };

    const { accessToken, refreshToken } = await generateToken(payload);
    return res.status(200).json({
      accessToken: accessToken,
      refreshToken: refreshToken,
      userName: user.userName,
      message: "logged in Successfully",
    });
  } catch (error) {
    return res.status(500).json({
      error: true,
      message: error.message,
    });
  }
};

export const logOutUser = async (req, res) => {
  try {
    const userToken = await Token.findOne({ token: req.body.refreshToken });
    if (!userToken) {
      return res.status(200).json({
        error: false,
        message: "Logged Out successfully",
      });
    }
    await Token.deleteOne({ token: req.body.refreshToken });
    return res.status(200).json({
      error: false,
      message: "Logged Out successfully",
    });
  } catch (error) {
    res.status(400).json({
      error: error,
      message: "Internal Server error occured",
    });
  }
};
