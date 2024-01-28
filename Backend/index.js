import express from "express";
import env from "dotenv"; /*package for loading the environment variables */
import mongoose from "mongoose"; /*mongoose library for Node.js */
import router from "./routes/route.js";
import cors from "cors"; /*cross-origin-resource-sharing */

const app =
  express(); /*an express application is created and stored in app variable */

/*Loading the envrionment variables */
env.config();

/*connecting the database */
mongoose
  .connect(process.env.DB_URL)
  .then(() => {
    console.log("Data Base Connected Sucessfully");
  })
  .catch((error) => console.log("Data Base Connection Failed"));

app.use(cors());
/*This middleware parses incoming JSON data in the request body and makes it available as req.body in the route handlers.*/
app.use(express.json());
/*This middleware is likely intended to parse incoming text data,  */
app.use(express.text());
/*"/api": This is the path at which the router will be mounted. 
Any requests that start with /api in their URL will be processed by the router. */
app.use("/api", router);

/*Creating server using express.
listen function takes two arguments 
1.PORT : port on which we should run our backend server
2.Call Back Function : If wish to perform something
after the server creation, we can do it in this call back function.*/
app.listen(process.env.PORT, () => {
  console.log(`Sereve running Successfully on PORT ${process.env.PORT}`);
});
