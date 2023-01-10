import "./App.css";

import DataProvider from "./context/DataProvider";

import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  Outlet,
} from "react-router-dom";
import { useState } from "react";

import Login from "./components/Account/Login";
import Home from "./components/Home/Home";
import Header from "./components/header/Header";
import CreatePost from "./components/create/CreatePost";
import DetailView from "./components/details/DetailView";
import Update from "./components/create/Update";
import Contact from "./components/contact/Contact";

const PrivateRoute = ({ isUserAuthenticated, ...props }) => {
  const token = sessionStorage.getItem("accessToken");

  return isUserAuthenticated && token ? (
    <>
      <Outlet />
    </>
  ) : (
    <Navigate replace to="/login" />
  );
};

function App() {
  const [isUserAuthenticated, setUserAuthenticated] = useState(false);
  return (
    <DataProvider>
      <BrowserRouter>
        {isUserAuthenticated ? <Header /> : null}
        <div>
          <Routes>
            <Route
              path="/login"
              element={
                <Login
                  style={{ marginTop: 64 }}
                  setUserAuthenticated={setUserAuthenticated}
                />
              }
            />
            <Route
              path="/"
              element={
                <PrivateRoute isUserAuthenticated={isUserAuthenticated} />
              }
            >
              <Route path="/" element={<Home />} />
            </Route>

            <Route
              path="/create"
              element={
                <PrivateRoute isUserAuthenticated={isUserAuthenticated} />
              }
            >
              <Route path="/create" element={<CreatePost />} />
            </Route>

            <Route
              path="/details/:id"
              element={
                <PrivateRoute isUserAuthenticated={isUserAuthenticated} />
              }
            >
              <Route path="/details/:id" element={<DetailView />} />
            </Route>

            <Route
              path="/update/:id"
              element={
                <PrivateRoute isUserAuthenticated={isUserAuthenticated} />
              }
            >
              <Route path="/update/:id" element={<Update />} />
            </Route>

            <Route
              path="/contact"
              element={
                <PrivateRoute isUserAuthenticated={isUserAuthenticated} />
              }
            >
              <Route path="/contact" element={<Contact />} />
            </Route>
          </Routes>
        </div>
      </BrowserRouter>
    </DataProvider>
  );
}

export default App;
