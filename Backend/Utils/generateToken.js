import jwt from "jsonwebtoken";
import Token from "../model/token.js";
import env from "dotenv";

env.config();

const generateToken = async (user) => {
  try {
    //generating jwt acess token
    const accessToken = jwt.sign(
      user, //payload
      process.env.ACCESS_SECRET_KEY, //secret key
      { expiresIn: "15s" }
    );
    //generating the refresh token with 30days expiry
    const refreshToken = jwt.sign(user, process.env.REFRESH_SECRET_KEY, {
      expiresIn: "30d",
    });
    /*checking whether the token corresponding to the current user exists,
    if exists then removing the document*/
    const userToken = await Token.findOne({ userId: user.userId });
    if (userToken) await userToken.deleteOne({ userId: user.userId });
    //Saving the refreshtoken in database
    await new Token({ userId: user.userId, token: refreshToken }).save();
    return Promise.resolve({ accessToken, refreshToken });
  } catch (error) {
    return Promise.reject({ accessToken, refreshToken });
  }
};

export default generateToken;
