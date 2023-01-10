import React, { useContext, useState, useEffect } from "react";
import { Box, Button, TextField, styled, Typography } from "@mui/material";
// import { alignProperty } from "@mui/material/styles/cssUtils";
import { useNavigate } from "react-router-dom";

import { API } from "../../service/api";
// import { typography } from "@mui/system";
import { DataContext } from "../../context/DataProvider";

const imgURL =
  "https://e7.pngegg.com/pngimages/178/595/png-clipart-user-profile-computer-icons-login-user-avatars-monochrome-black-thumbnail.png";

const Container = styled(Box)`
  width: 400px;
  margin: auto;
  margin-top: 30px;
  box-shadow: 5px 2px 5px 2px rgb(0 0 0/ 0.6);
`;

const Image = styled("img")({
  width: 100,
  display: "flex",
  margin: "auto",
  padding: "50px 0 0",
});

const Wrapper = styled(Box)`
  padding: 25px 35px;
  display: flex;
  flex-direction: column;

  & > div,
  & > button,
  & > p {
    margin-top: 20px;
  }
`;

const SignupButton = styled(Button)`
  text-transform: none;
  background: #fff;
  color: #2874f0;
  height: 48px;
  border-radius: 2px;
  box-shadow: 0 2px 4px 0 rgb(0 0 0 / 20%);
`;

const LoginButton = styled(Button)`
  text-transform: none;
  color: #fff;
  height: 48px;
  border-radius: 2px;
`;

const Text = styled(Typography)`
  color: #878787;
  font-size: 16px;
`;

const Error = styled(Typography)`
  color: #ff6161;
  font-size: 10px;
  font-weight: 600;
`;

const signupInitialValue = {
  name: "",
  username: "",
  password: "",
};

const loginInitialValue = {
  username: "",
  password: "",
};

const Login = ({ setUserAuthenticated }) => {
  const [account, toggleAccount] = useState("login");
  const [signUp, setSignUp] = useState(signupInitialValue);
  const [error, setError] = useState("");
  const [login, setLogin] = useState(loginInitialValue);

  const { setAccount } = useContext(DataContext);
  const navigate = useNavigate();

  useEffect(() => {
    setUserAuthenticated(false);
    //localStorage.clear();
    sessionStorage.clear();
  }, []);

  const toggleAccountValue = () => {
    account === "login" ? toggleAccount("signup") : toggleAccount("login");
  };

  const InputChange = (e) => {
    setSignUp({ ...signUp, [e.target.name]: e.target.value });
  };

  const InputChangeValue = (e) => {
    setLogin({ ...login, [e.target.name]: e.target.value });
  };

  const signUpUser = async () => {
    if (
      signUp.name === "" ||
      signUp.username === "" ||
      signUp.password === ""
    ) {
      setError("Missing Parameters value..");
      return;
    }

    const response = await API.userSignUp(signUp);
    console.log(response);
    try {
      if (response.isSuccess) {
        setSignUp(signupInitialValue);
        setError("");
        toggleAccount("login");
      } else {
        setError("Something went Wrong!!..");
      }
    } catch (error) {
      setError("Something went Wrong!!..");
      console.log(error);
    }
  };

  const loginUser = async () => {
    if (login.username === "" || login.password === "") {
      setError("Missing parameters..");
      return;
    } else {
      setError("");
    }
    //try {
    const response = await API.userLogin(login);
    console.log(response);
    if (response && response.isSuccess) {
      setError("");

      sessionStorage.setItem(
        "accessToken",
        `Bearer ${response.data.accessToken}`
      );
      sessionStorage.setItem(
        "refreshToken",
        `Bearer ${response.data.refreshToken}`
      );

      // name, username;
      // sessionStorage.setItem("name", `${response.data.name}`);
      // sessionStorage.setItem("username", `${response.data.username}`);
      setAccount({
        username: response.data.username,
        name: response.data.name,
      });
      setUserAuthenticated(true);
      navigate("/");
    } else {
      // console.log("rohit here");
      setError("Something went Wrong..");
    }
    // } catch (error) {
    //   setError("Something went wrong..");
    //   console.log(error);
    // }
  };

  return (
    <Container>
      <Box>
        <Image src={imgURL} alt="User-Logo" />
        {account === "login" ? (
          <Wrapper>
            <TextField
              id="standard-basic"
              label="Username"
              variant="standard"
              onChange={(e) => InputChangeValue(e)}
              name="username"
              value={login.username}
            />
            <TextField
              id="standard-basic"
              label="Password"
              variant="standard"
              onChange={(e) => InputChangeValue(e)}
              name="password"
              value={login.password}
            />
            {error && <Error>{error}</Error>}
            <LoginButton variant="contained" onClick={() => loginUser()}>
              Login
            </LoginButton>
            <Text style={{ textAlign: "center" }}>OR</Text>
            <SignupButton onClick={() => toggleAccountValue()}>
              Create an Account
            </SignupButton>
          </Wrapper>
        ) : (
          <Wrapper>
            <TextField
              id="standard-basic"
              label="Enter Name"
              variant="standard"
              name="name"
              onChange={(e) => InputChange(e)}
              value={signUp.name}
            />
            <TextField
              id="standard-basic"
              label="Enter Username"
              variant="standard"
              name="username"
              onChange={(e) => InputChange(e)}
              value={signUp.username}
            />
            <TextField
              id="standard-basic"
              label="Enter Password"
              variant="standard"
              name="password"
              onChange={(e) => InputChange(e)}
              value={signUp.password}
            />
            {error && <Error>{error}</Error>}
            <SignupButton onClick={() => signUpUser()}>Sign up</SignupButton>
            <Text style={{ textAlign: "center" }}>OR</Text>
            <LoginButton
              variant="contained"
              onClick={() => toggleAccountValue()}
            >
              Already have an Account
            </LoginButton>
          </Wrapper>
        )}
      </Box>
    </Container>
  );
};

export default Login;
