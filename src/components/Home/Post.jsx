import React from "react";
import { Box, styled, Typography } from "@mui/material";

import { addEcliplse } from "../../utils/common-utils";

const Container = styled(Box)`
  border: 1px solid #d3cede;
  border-radius: 10px;
  margin: 10px;
  height: 200px;
  display: flex;
  align-items: center;
  flex-direction: column;
  & > p {
    padding: 0 5px 5px 5px;
  }
`;

const Text = styled(Typography)`
  font-size: 12px;
  font-weight: 400;
  color: #878787;
`;

const Heading = styled(Typography)`
  font-size: 20px;
  font-weight: 600;
`;

const Expiring = styled(Typography)`
  color: red;
  float: bottom;
`;

const CreatedDate = styled(Typography)`
  color: green;
`;

const Description = styled(Typography)`
  word-break: break-word;
  fonbt-size: 14px;
`;

const Post = ({ post }) => {
  // console.log("post szection", post);
  let expiringDate = new Date(post.createdDate);
  expiringDate.setDate(expiringDate.getDate() + Number(post.expiringDay));
  //console.log(expiringDate);
  return (
    <Container>
      <Text style={{ marginTop: 10 }}>{post.category}</Text>
      <Heading>{addEcliplse(post.title, 14)}</Heading>
      <Text> {post.username}</Text>
      <Description>{addEcliplse(post.description, 45)}</Description>
      <CreatedDate>{new Date(post.createdDate).toDateString()}</CreatedDate>
      {/* <Expiring>{post.expiringDay}</Expiring> */}
      <Expiring>{new Date(expiringDate).toDateString()}</Expiring>
    </Container>
  );
};

export default Post;
