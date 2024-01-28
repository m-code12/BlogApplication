import jwt from "jsonwebtoken";
import env from "dotenv";

env.config();

export const authenticateToken = (req, res, next) => {
  /*Getting the access token */
  const authHeader = req.headers["authorization"];
  /*Access token concatenated with the bearer,so splitting by ' ' and taking 
  second value */
  const accessToken = authHeader && authHeader.split(" ")[1];

  /*If token doesn't come from frontend */
  if (accessToken == null)
    return res.status(400).json({
      msg: "Token is missing",
    });
  /*Verfying the jwt token,verify function gives the call back function 
  with two arguments, error and user data stored in the token.
  If any error occur then return from there, if no error occured then call
  the next() */
  jwt.verify(accessToken, process.env.ACCESS_SECRET_KEY, (error, user) => {
    if (error) {
      return res.status(400).json({
        msg: "Invalid Token",
      });
    }
    req.user = user;
    next();
  });
};
