import React, { useState, useContext, useEffect } from "react";

import { DataContext } from "../../../context/DataProvider";

import { API } from "../../../service/api";
import Comment from "./Comment";

import {
  Box,
  Typography,
  TextareaAutosize,
  Button,
  styled,
} from "@mui/material";

const imgURL =
  "https://e7.pngegg.com/pngimages/178/595/png-clipart-user-profile-computer-icons-login-user-avatars-monochrome-black-thumbnail.png";

const Container = styled(Box)`
  margin-top: 60px;
  display: flex;
`;

const Image = styled("img")({
  height: "50px",
});

const StyledTextArea = styled(TextareaAutosize)`
  height: 100px;
  width: 100%;
  margin: 0 20px;
`;

const initialComment = {
  name: "",
  postid: "",
  comment: "",
  date: new Date(),
};

const Comments = ({ post }) => {
  const [comment, setComment] = useState(initialComment);
  const [toggle, setToggle] = useState(true);
  const [comments, setComments] = useState([]);
  const { account } = useContext(DataContext);

  useEffect(() => {
    const getData = async () => {
      const result = await API.getAllComments(post._id);
      if (result.isSuccess) {
        setComments(result.data);
      }
    };
    getData();
  }, [post, toggle]);

  const handleChange = (e) => {
    setComment({
      ...comment,
      name: account.username,
      postid: post._id,
      comment: e.target.value,
    });
  };

  const addComment = async () => {
    try {
      const addComm = await API.addComment(comment);
      if (addComm.isSuccess) {
        setComment(initialComment);
        setToggle((prevState) => !prevState);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Container>
        <Image src={imgURL} alt="userLogo" />
        <StyledTextArea
          minRows={3}
          placeholder="What's on your mind"
          value={comment.comment}
          onChange={(e) => handleChange(e)}
        />
        <Button
          variant="contained"
          size="medium"
          style={{ height: 40 }}
          onClick={() => addComment()}
        >
          Post
        </Button>
      </Container>
      <Box>
        {comments &&
          comments.length > 0 &&
          comments.map((comment) => (
            <Comment comment={comment} setToggle={setToggle} />
          ))}
      </Box>
    </>
  );
};

export default Comments;
