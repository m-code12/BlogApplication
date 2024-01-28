import "../write/write.css";
import Category from "../../components/categories/Categories";
import { Snackbar, Alert } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import img from "../../constants";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
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

export default function UpdateBlog() {
  const [blog, setBlog] = useState(intialBlog);
  const [openAlert, setOpenAlert] = useState(false);
  const [alertDetails, setAlertDetails] = useState({
    severity: "",
    message: "",
  });
  const { id } = useParams();
  const navigate = useNavigate();

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenAlert(false);
  };

  useEffect(() => {
    const fetchBlogData = async () => {
      let flag = true;
      if (isAcessTokenExpired()) {
        flag = await refreshAccessToken();
      }
      if (flag) {
        try {
          let response = await fetch(
            `http://localhost:8000/api/getBlogById/${id}`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                authorization: sessionStorage.getItem("accessToken"),
              },
            }
          );
          if (!response.ok) {
            response = await response.json();
            throw new Error(response.msg);
          }
          const currBlogData = await response.json();
          setBlog(currBlogData);
        } catch (error) {
          const alert = alertDetails;
          alert.severity = "error";
          alert.message = error.message;
          setAlertDetails(alert);
          setOpenAlert(true);
        }
      } else {
        const alert = alertDetails;
        alert.severity = "error";
        alert.message = "Authentication Failed,Please Login";
        setAlertDetails(alert);
        setOpenAlert(true);
      }
    };
    fetchBlogData();
  }, [id]);

  const updateBlogHandler = async (event) => {
    event.preventDefault();
    let flag = true;
    if (isAcessTokenExpired()) {
      flag = await refreshAccessToken();
    }
    if (flag) {
      try {
        let response = await fetch(`http://localhost:8000/api/update/${id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            authorization: sessionStorage.getItem("accessToken"),
          },
          body: JSON.stringify(blog),
        });
        if (!response.ok) {
          response = await response.json();
          throw new Error(response.msg);
        }
        navigate(`/post/${id}`);
      } catch (error) {
        const alert = alertDetails;
        alert.severity = "error";
        alert.message = error.message;
        setAlertDetails(alert);
        setOpenAlert(true);
      }
    } else {
      const alert = alertDetails;
      alert.severity = "error";
      alert.message = "Authentication Failed,Please Login";
      setAlertDetails(alert);
      setOpenAlert(true);
    }
  };

  const dataChangeHandler = (event) => {
    setBlog({ ...blog, [event.target.name]: event.target.value });
  };

  const saveCategories = (categories) => {
    blog.categories = categories;
  };

  return (
    <div className="write">
      <img className="writeImg" src={img} alt=""></img>
      <form className="writeForm">
        <div className="container">
          <div className="writeFormGroup1">
            <input
              className="writeInput"
              placeholder="Title"
              name="title"
              type="text"
              autoFocus={true}
              onChange={dataChangeHandler}
              value={blog.title}
            />
          </div>
          <div>
            <Category
              className="category"
              getCategories={saveCategories}
              blogCats={blog.categories}
            ></Category>
          </div>
          <button className="writeSubmit" onClick={updateBlogHandler}>
            Update
          </button>
        </div>

        <StyledTextArea
          placeholder="Tell your story..."
          type="text"
          autoFocus={true}
          onChange={dataChangeHandler}
          name="description"
          value={blog.description}
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
