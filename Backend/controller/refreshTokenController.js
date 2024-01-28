import jwt from "jsonwebtoken";
import verifyRefreshToken from "../Utils/verifyRefreshToken.js";
import env from "dotenv";

env.config();

const refreshToken = async (req, res) => {
  const refreshToken = req.body.refreshToken.split(" ")[1];

  try {
    const { tokenDetails, error, message } = await verifyRefreshToken(
      refreshToken
    );

    if (error) {
      res.status(400).json({
        msg: "Invalid Refresh Token",
        error: message,
      });
      return;
    }

    // Generating the new access token
    const accessToken = jwt.sign(tokenDetails, process.env.ACCESS_SECRET_KEY);

    res.status(200).json({
      error: false,
      accessToken,
      message: "Access token created successfully",
    });
  } catch (error) {
    res.status(400).json({
      msg: "Something went wrong",
      error: error,
    });
  }
};

export default refreshToken;
