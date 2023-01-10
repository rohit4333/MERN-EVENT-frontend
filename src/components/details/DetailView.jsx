import React, { useState, useEffect, usecontext } from "react";
import { Box, styled, Typography } from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";

import { useParams, Link, useNavigate } from "react-router-dom";
import { API } from "../../service/api";
import { DataContext } from "../../context/DataProvider";
import { useContext } from "react";

import Comments from "./comments/Comments";

const Container = styled(Box)(({ theme }) => ({
  margin: "50px 100px",
  [theme.breakpoints.down("md")]: {
    margin: "5px 5px",
  },
}));

const Heading = styled(Typography)`
  font-size: 38px;
  font-weight: 600;
  text-align: center;
  margin: 50px 0 0;
  word-break: break-word;
`;

const EditIcon = styled(Edit)`
  margin: 5px;
  border: 1px solid #878787;
  border-radius: 10px;
  padding: 5px;
`;

const DeleteIcon = styled(Delete)`
  margin: 5px;
  border: 1px solid #878787;
  border-radius: 10px;
  padding: 5px;
`;

const Expiring = styled(Typography)`
  color: red;
`;

const CreatedDate = styled(Typography)`
  color: green;
`;

const Author = styled(Box)`
  color: #878787;
  margin: 20px;
`;

const StyledDate = styled(Box)`
  display: flex;
  margin: 10px 0;
`;

const Description = styled(Typography)`
  word-break: break-word;
`;

const DetailView = () => {
  const [post, setPost] = useState({});
  const { id } = useParams();
  const navigate = useNavigate();
  const { account } = useContext(DataContext);
  useEffect(() => {
    const fetchpost = async () => {
      const result = await API.getPostByid(id);
      if (result.isSuccess) {
        setPost(result.data);
      }
    };
    fetchpost();
  }, []);

  let expiringDate = new Date(post.createdDate);
  expiringDate.setDate(expiringDate.getDate() + Number(post.expiringDay));

  const deletecall = async () => {
    const response = await API.deletePost(post._id);
    if (response.isSuccess) {
      navigate("/");
    }
  };

  return (
    <Container>
      <Heading> {post.title}</Heading>

      <Box style={{ float: "right" }}>
        {account.username === post.username && (
          <>
            <Link to={`/update/${post._id}`}>
              <EditIcon color="primary" />
            </Link>
            <DeleteIcon onClick={() => deletecall()} color="error" />
          </>
        )}
      </Box>

      <Author>
        <Typography>
          Author:{" "}
          <Box component="span" style={{ fontWeight: 600 }}>
            {post.username}
          </Box>
        </Typography>
        <Typography>Available Seats: {post.teamSize}</Typography>
        <StyledDate>
          <CreatedDate>
            <Box component="span" style={{ color: "black" }}>
              Started at:{" "}
            </Box>
            {new Date(post.createdDate).toDateString()}
          </CreatedDate>
          <Expiring style={{ marginLeft: "auto" }}>
            <Box component="span" style={{ color: "black" }}>
              Ends at:{" "}
            </Box>
            {new Date(expiringDate).toDateString()}
          </Expiring>
        </StyledDate>
      </Author>
      <Description>{post.description}</Description>
      <Comments post={post} />
    </Container>
  );
};

export default DetailView;
