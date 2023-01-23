import React, { useEffect, useState, useCallback } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AddPost from "./pages/AddPost";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import "antd/dist/antd.css";
import "./App.css";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { useSelector, useDispatch } from "react-redux";
import { getAllPost } from "./Redux/action/postAction";
import { getAllUsers } from "./Redux/action/userAction";
import AllUsers from "./pages/AllUsers";
import EditProfile from "./pages/EditProfile";
function App() {
  const { loading, likeorunlikeloading } = useSelector(
    (state) => state.alertsReducers
  );
  const dispatch = useDispatch();
  const user = localStorage.getItem("user");
  const parsedUser = JSON.parse(user);
  const [token, setToken] = useState("");
  const [expiration, setExpiration] = useState("");
// get post and users details
  useEffect(() => {
    if (user) {
      dispatch(getAllPost());
    }
  }, []);

  useEffect(() => {
    dispatch(getAllUsers());
  }, []);
//manage token accesss
  useEffect(() => {
    setToken(JSON.parse(localStorage.getItem("token")));
    setExpiration(new Date(new Date().getTime() + 1000 * 60 * 60));
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/";
  }, []);

  let logoutTimer;
  useEffect(() => {
    if (token && expiration) {
      const remainingTime =
        new Date(expiration).getTime() - new Date().getTime();
      logoutTimer = setTimeout(logout, remainingTime);
    } else {
      clearTimeout(logoutTimer);
    }
  }, [token, logout, expiration]);

  return (
    <div>
      {(loading || likeorunlikeloading) && (
        <div className="spinner-border" role="status">
          <span class="sr-only">Loading...</span>
        </div>
      )}
      <BrowserRouter>
        <Routes>
          <Route path="/login" exact element={<Login />} />
          <Route path="/register" exact element={<Register />} />
          <Route path="/" exact element={token ? <Home /> : <Login />} />
          <Route
            path="/profile/:userId"
            exact
            element={token ? <Profile /> : <Login />}
          />
          <Route
            path="/addpost"
            exact
            element={token ? <AddPost /> : <Login />}
          />
          <Route
            path="/allUser"
            exact
            element={token ? <AllUsers /> : <Login />}
          />
          <Route
            path="/editprofile"
            exact
            element={token ? <EditProfile /> : <Login />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
