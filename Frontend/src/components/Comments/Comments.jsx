import {
  Box,
  TextareaAutosize,
  Button,
  styled,
  Typography,
} from "@mui/material";
import { useState, useContext, useEffect } from "react";
import { Context } from "../../context/Context";
import { useParams } from "react-router-dom";
import { Snackbar, Alert } from "@mui/material";
import debounce from "lodash/debounce";
import { isAcessTokenExpired, refreshAccessToken } from "../../constants";

const Container = styled(Box)`
  margin-top: 100px;
  width: 70vw;
  margin-left: 8%;
  display: flex;
  margin-bottom: 20px;
`;

const StyledTextArea = styled(TextareaAutosize)`
  font-family: "Roboto, sans-serif";
  font-size: 18px;
  height: 100px;
  width: 100%;
  margin: 0 20px;
  /* background-color: #f5f5f5; */
  outline: none;
  border: none;
  resize: none;
  border-bottom: 2px solid black;
  &:focus-visible {
    outline: none;
  }
`;

const StyledButton = styled(Button)`
  background-color: green !important;
  color: white;
  &:hover {
    background-color: green !important;
  }
`;
const initialCommentData = {
  userName: "",
  postId: "",
  commentDescription: "",
  date: new Date(),
};

const Component = styled(Box)`
  width: 70vw;
  margin-top: 10px;
  /* background: #f5f5f5; */
  padding: 15px;
  margin-left: 10%;
`;

const Container2 = styled(Box)`
  display: flex;
  margin-bottom: 5px;
`;

const Name = styled(Typography)`
  font-weight: 600;
  margin-right: 20px;
`;

const StyledDate = styled(Typography)`
  color: #878787;
  /* color : white; */
  font-size: 14px;
`;

const StyledDescription = styled(Typography)`
  width: 70vw;
  word-wrap: break-word;
`;

export const Comments = ({ blogData }) => {
  const [commentData, setCommentData] = useState(initialCommentData);
  const [allCommentsData, setAllCommentsData] = useState([]);
  const { user } = useContext(Context);
  const { id } = useParams();
  const [toggle, setToggle] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);
  const [alertDetails, setAlertDetails] = useState({
    severity: "",
    message: "",
  });

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenAlert(false);
  };

  const debouncedSetToggle = debounce((value) => {
    setToggle(value);
  }, 1500); // Adjust the delay time as needed

  useEffect(() => {
    const fetchAllComments = async () => {
      let flag = true;
      if (isAcessTokenExpired()) {
        flag = await refreshAccessToken();
      }
      if (flag) {
        try {
          const response = await fetch(
            `http://localhost:8000/api/getAllComments/${id}`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                authorization: sessionStorage.getItem("accessToken"),
              },
            }
          );
          const allComments = await response.json();
          setAllCommentsData(allComments);
        } catch (error) {
          const alert = alertDetails;
          alert.severity = "error";
          alert.message = "Fetching Comments Failed";
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
    fetchAllComments();
  }, [toggle]);

  const deleteCommentHandler = async (comment) => {
    let flag = true;
    if (isAcessTokenExpired()) {
      flag = await refreshAccessToken();
    }
    if (flag) {
      try {
        let response = await fetch(
          `http://localhost:8000/api/deleteComment/${comment._id}`,
          {
            method: "DELETE",
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
        const alert = alertDetails;
        alert.severity = "success";
        alert.message = "Comment Deleted Successfully";
        setAlertDetails(alert);
        setOpenAlert(true);
        // setToggle((prevState) => !prevState);
        debouncedSetToggle((prevState) => !prevState);
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

  const commentChangeHandler = (event) => {
    setCommentData({
      ...commentData,
      userName: user.userName,
      postId: id,
      commentDescription: event.target.value,
    });
  };

  const addCommentHandler = async (event) => {
    let flag = true;
    if (isAcessTokenExpired()) {
      flag = await refreshAccessToken();
    }
    if (flag) {
      try {
        let response = await fetch("http://localhost:8000/api/comment/save", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            authorization: sessionStorage.getItem("accessToken"),
          },
          body: JSON.stringify(commentData),
        });

        if (!response.ok) {
          response = await response.json();
          throw new Error(response.msg);
        }
        const alert = alertDetails;
        alert.severity = "success";
        alert.message = "Comment Added Successfully";
        setCommentData(initialCommentData);
        setAlertDetails(alert);
        setOpenAlert(true);
        debouncedSetToggle((prevState) => !prevState);
        // setToggle((prevState) => !prevState);
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
    <Box>
      {/*For the commenting textarea*/}
      <Container>
        <StyledTextArea
          minRows={1}
          placeholder="What's you think of blog"
          value={commentData.commentDescription}
          onChange={commentChangeHandler}
        ></StyledTextArea>
        <StyledButton
          variant="contained"
          size="small"
          style={{ height: 40 }}
          onClick={addCommentHandler}
        >
          Comment
        </StyledButton>
      </Container>
      {/*Display of comments */}
      <Box>
        {allCommentsData &&
          allCommentsData.length > 0 &&
          allCommentsData
            .slice()
            .reverse()
            .map((comment) => {
              return (
                <Component>
                  <Container2 key={comment._id}>
                    <Name>{comment.userName}</Name>
                    <StyledDate>
                      {new Date(comment.date).toDateString()}
                    </StyledDate>
                    {user.userName === comment.userName && (
                      //   <DeleteIcon onClick={deleteCommentHandler}></DeleteIcon>
                      <i
                        className="deleteIcon far fa-trash-alt"
                        onClick={() => deleteCommentHandler(comment)}
                      ></i>
                    )}
                  </Container2>
                  <Box>
                    <StyledDescription>
                      {comment.commentDescription}
                    </StyledDescription>
                  </Box>
                </Component>
              );
            })}
      </Box>
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
    </Box>
  );
};
export default Comments;
