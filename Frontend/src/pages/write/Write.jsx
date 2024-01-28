import "./write.css";
import Category from "../../components/categories/Categories";
import { Snackbar, Alert } from "@mui/material";
import { Context } from "../../context/Context";
import { useState, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import img from "../../constants";
import { TextareaAutosize, styled } from "@mui/material";
import { isAcessTokenExpired, refreshAccessToken } from "../../constants";

const intialBlog = {
  title: "",
  description: "",
  userName: "",
  categories: [],
  image: "",
};

const StyledTextArea = styled(TextareaAutosize)`
  width: 80vw;
  font-family: inherit;
  font-size: 18px;
  outline: none;
  border: none;
  resize: none;
  margin-left: 8%;
  &:focus-visible {
    outline: none;
  }
  margin-bottom: 20px;
`;

export default function Write() {
  const [blog, setBlog] = useState(intialBlog);
  const [openAlert, setOpenAlert] = useState(false);
  // const [file, setFile] = useState(null);
  const [alertDetails, setAlertDetails] = useState({
    severity: "",
    message: "",
  });
  const { user } = useContext(Context);
  const location = useLocation();
  const navigate = useNavigate();

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenAlert(false);
  };

  const dataChangeHandler = (event) => {
    setBlog({ ...blog, [event.target.name]: event.target.value });
  };

  const saveCategories = (categories) => {
    blog.categories = categories;
  };

  const saveBlogHandler = async (event) => {
    event.preventDefault();
    blog.userName = user.userName;
    let flag = true;
    if (isAcessTokenExpired()) {
      flag = await refreshAccessToken();
    }
    if (flag) {
      fetch("http://localhost:8000/api/save/blog", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: sessionStorage.getItem("accessToken"),
        },
        body: JSON.stringify(blog),
      })
        .then((response) => {
          if (!response.ok) throw new Error("response was not ok");
          return response.json();
        })
        .then((data) => {
          navigate("/posts");
        })
        .catch((error) => {
          const alert = alertDetails;
          alert.severity = "error";
          alert.message = "Blog Creation Unsuccessful";
          setAlertDetails(alert);
          setOpenAlert(true);
        });
    } else {
      const alert = alertDetails;
      alert.severity = "error";
      alert.message = "Authentication Failed,Please Login";
      setAlertDetails(alert);
      setOpenAlert(true);
    }
  };

  return (
    <div className="write">
      <img className="writeImg" src={img} alt=""></img>
      <form className="writeForm">
        <div className="container">
          <div className="writeFormGroup1">
            {/* <label htmlFor="fileInput">
              <i className="writeIcon fas fa-plus"></i>
            </label> */}
            {/* <input id="fileInput" type="file" style={{ display: "none" }} /> */}
            <input
              className="writeInput"
              placeholder="Title"
              name="title"
              type="text"
              autoFocus={true}
              onChange={dataChangeHandler}
            />
          </div>
          <div>
            <Category
              className="category"
              getCategories={saveCategories}
            ></Category>
          </div>
          <button className="writeSubmit" onClick={saveBlogHandler}>
            Publish
          </button>
        </div>

        <StyledTextArea
          placeholder="Tell your story..."
          type="text"
          autoFocus={true}
          onChange={dataChangeHandler}
          name="description"
        />
      </form>
      <Snackbar
        open={openAlert}
        autoHideDuration={2000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          severity={alertDetails.severity}
          onClose={handleClose}
          variant="filled"
          elevation={6}
        >
          {alertDetails.message}
        </Alert>
      </Snackbar>
    </div>
  );
}
