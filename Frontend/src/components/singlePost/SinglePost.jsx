import { Link, useLocation } from "react-router-dom";
import "./singlePost.css";
import { useContext, useEffect, useState } from "react";
import { Snackbar, Alert } from "@mui/material";
import Sidebar from "../sidebar/Sidebar";
import img from "../../constants";
import { useNavigate } from "react-router-dom";
import Comments from "../Comments/Comments";
import { Context } from "../../context/Context";
import { isAcessTokenExpired, refreshAccessToken } from "../../constants";
import ReactMarkdown from "react-markdown";

export default function SinglePost() {
  const location = useLocation();
  const id = location.pathname.split("/")[2];
  const [blogData, setBlogData] = useState([]);
  const [openAlert, setOpenAlert] = useState(false);
  const [alertDetails, setAlertDetails] = useState({
    severity: "",
    message: "",
  });
  const { user } = useContext(Context);
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenAlert(false);
  };
  const navigate = useNavigate();

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
          setBlogData(currBlogData);
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

  const deleteBlogHandler = async (event) => {
    let flag = true;
    if (isAcessTokenExpired()) {
      flag = await refreshAccessToken();
    }
    if (flag) {
      try {
        let response = await fetch(`http://localhost:8000/api/delete/${id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            authorization: sessionStorage.getItem("accessToken"),
          },
        });
        if (!response.ok) {
          response = await response.json();
          throw new Error(response.msg);
        }
        navigate("/posts");
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

  return (
    <div className="singlePost">
      <div className="singlePostWrapper">
        <img className="singlePostImg" src={img} alt="" />
        <h1 className="singlePostTitle">
          {blogData.title}
          {user.userName == blogData.userName && (
            <div className="singlePostEdit">
              <Link to={`/update/${id}`}>
                <i className="editIcon far fa-edit"></i>
              </Link>

              <i
                className="deleteIcon far fa-trash-alt"
                onClick={deleteBlogHandler}
              ></i>
            </div>
          )}
        </h1>
        <div className="singlePostContainer">
          <div className="postContent">
            <div className="singlePostInfo">
              <span>
                Author:
                <b className="singlePostAuthor">
                  <Link
                    className="link"
                    to={`/posts?user=${blogData.userName}`}
                  >
                    {blogData.userName}
                  </Link>
                </b>
              </span>
              <span>{new Date(blogData.createdAt).toDateString()}</span>
            </div>
            <div className="singlePostDesc">
              <ReactMarkdown>{blogData.description}</ReactMarkdown>
            </div>
          </div>
          {blogData.categories && (
            <Sidebar cats={blogData.categories}></Sidebar>
          )}
        </div>
      </div>
      <Comments></Comments>
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
