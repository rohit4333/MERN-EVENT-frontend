import React, { useState, useEffect, useContext } from "react";

import {
  Box,
  Button,
  styled,
  TextareaAutosize,
  TextField,
  Typography,
} from "@mui/material";

import { DataContext } from "../../context/DataProvider";
import { API } from "../../service/api";

import { useNavigate, useLocation, useParams } from "react-router-dom";

const Container = styled(Box)(({ theme }) => ({
  margin: "50px 100px",
  [theme.breakpoints.down("md")]: {
    margin: "5px 5px",
  },
}));

const StytedBox = styled(Box)`
  margin-top: 20px;
  display: flex;
  flex-direction: row;\

`;

const Inputtextfield = styled(TextField)`
  flex: 1;
  font-size: 25px;
  margin: 0 20px 0 0;
`;

const TextArea = styled(TextareaAutosize)`
  width: 100%;
  margin-top: 50px;
  font-size: 18px;
  border: none;
  &: focus-visible {
    outline: none;
  }
`;

const Text = styled(Typography)`
  font-size: 25px;
  text-align: center;
`;

const initialPostValue = {
  title: "",
  teamSize: "",
  description: "",
  username: "",
  category: "",
  createdDate: new Date(),
  expiringDay: "",
};

const Update = () => {
  const { account } = useContext(DataContext);
  const [post, setPost] = useState(initialPostValue);
  // const [title, setTitle] = useState("");

  const location = useLocation();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setPost({ ...post, [e.target.name]: e.target.value });
  };
  const { id } = useParams();

  useEffect(() => {
    const fetchdata = async () => {
      const response = await API.getPostByid(id);
      if (response.isSuccess) {
        setPost(response.data);
      }
    };
    fetchdata();
  }, []);

  const handlePublish = async () => {
    if (
      post.title === "" ||
      post.teamSize === "" ||
      post.description === "" ||
      post.expiringDay === ""
    ) {
      console.log("missing parameters...");
      return;
    }

    const response = await API.updatePost(post);
    navigate(`/details/${post._id}`);
    // try {
    //   if (response.isSuccess) {

    //   }
    // } catch (error) {
    //   console.log(error);
    // }
  };

  return (
    <Container>
      <StytedBox>
        <Inputtextfield
          label="Title of the Event.."
          onChange={(e) => handleChange(e)}
          name="title"
          variant="standard"
          value={post.title}
        />
      </StytedBox>

      <StytedBox>
        <Inputtextfield
          label="Number of Players Allowed"
          variant="standard"
          type="number"
          name="teamSize"
          value={post.teamSize}
          onChange={(e) => handleChange(e)}
        />
        <Inputtextfield
          label="Number of days left to Event"
          variant="standard"
          type="number"
          name="expiringDay"
          value={post.expiringDay}
          onChange={(e) => handleChange(e)}
        />
      </StytedBox>
      <TextArea
        minRows={5}
        name="description"
        value={post.description}
        placeholder="Describe your Event.."
        onChange={(e) => handleChange(e)}
      />
      <Button variant="contained" onClick={() => handlePublish()}>
        Update the Event
      </Button>
    </Container>
  );
};

export default Update;
