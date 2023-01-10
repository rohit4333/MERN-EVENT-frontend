import { Grid } from "@mui/material";
import React, { useContext } from "react";
import { DataContext } from "../../context/DataProvider";
import Categeries from "./Categeries";
import Posts from "./Posts";
const Home = () => {
  const { account } = useContext(DataContext);
  return (
    <>
      <div style={{ margin: 20 }}>
        Hello from <b>"{account.name}"</b> having username of{" "}
        <i>"{account.username}"</i>
      </div>
      <Grid container>
        <Grid item lg={1.5} sm={2} xs={12}>
          <Categeries />
        </Grid>
        <Grid container item lg={10.5} xs={12} sm={10}>
          <Posts />
        </Grid>
      </Grid>
    </>
  );
};

export default Home;
