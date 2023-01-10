import React, { useState, useEffect } from "react";
import { Box, Grid } from "@mui/material";

import { Link, useSearchParams } from "react-router-dom";
import Post from "./Post";

import { API } from "../../service/api";

const Posts = () => {
  const [posts, setPosts] = useState([]);

  const [searchParams] = useSearchParams();
  const category = searchParams.get("category");
  useEffect(() => {
    const fetchData = async () => {
      try {
        let response = await API.getAllPosts({ category: category || "" });
        if (response.isSuccess) {
          setPosts(response.data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [category]);

  return (
    <>
      {posts && posts.length > 0 ? (
        posts.map((post) => (
          <Grid item lg={3} xs={12} sm={4}>
            <Link
              to={`details/${post._id}`}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <Post key={post._id} post={post} />
            </Link>
          </Grid>
        ))
      ) : (
        <Box style={{ color: "#878787", margin: "20px 80px", fontSize: 16 }}>
          No data Available to Display
        </Box>
      )}
    </>
  );
};

export default Posts;
