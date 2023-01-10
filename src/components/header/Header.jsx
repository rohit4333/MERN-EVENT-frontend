import React, { useContext } from "react";
import { AppBar, Toolbar, Box, Typography, styled } from "@mui/material";
import { Link } from "react-router-dom";
import { DataContext } from "../../context/DataProvider";

const Username = styled(Typography)`
  color: red;
  font-weight: 600;
  padding: 20px;
`;

const Container = styled(Box)`
  display: flex;
  flex-direction: row;
  justify-content: center;
  & > a {
    padding: 20px;
    text-decoration: none;
    color: #000;
  }
`;

const Content = styled(AppBar)`
  background: #ffffff;
`;

const Header = () => {
  const { account } = useContext(DataContext);
  return (
    <Content position="static">
      <Toolbar>
        <Username>{account.username ? account.username : "username"}</Username>
        <Container>
          <Link to="/">Home</Link>
          {/* <Link to="/about">About Us</Link> */}
          <Link to="/contact">Contact Us</Link>
        </Container>
        <Link
          to="/login"
          style={{
            marginLeft: "auto",
            textDecoration: "none",
            color: "black",
            paddingRight: "20px",
          }}
        >
          Logout
        </Link>
      </Toolbar>
    </Content>
  );
};

export default Header;
