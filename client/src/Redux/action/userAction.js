import axios from "axios";
import { message } from "antd";
export const userRegister = (values) => async (dispatch) => {
  console.log(values);
  dispatch({ type: "LOADING", payload: true });
  try {
    await axios.post("http://localhost:5000/api/user/register", values);
    dispatch({ type: "LOADING", payload: false });
    message.success("User registered successfully");
    window.location.href = "/login";
  } catch (error) {
    console.log(error);
    dispatch({ type: "LOADING", payload: false });
    message.error("something went wrong");
  }
};

export const userLogin = (values) => async (dispatch) => {
  dispatch({ type: "LOADING", payload: true });
  try {
    const response = await axios.post(
      "http://localhost:5000/api/user/login",
      values
    );
    dispatch({ type: "LOADING", payload: false });
    message.success("login successfully");
    console.log("response",response.data)
    localStorage.setItem("user", JSON.stringify(response.data.user));
    localStorage.setItem("token", JSON.stringify(response.data.token));
    window.location.href = "/";
  } catch (error) {
    console.log(error);
    dispatch({ type: "LOADING", payload: false });
    message.error("Invalid credentials");
  }
};

export const getAllUsers = () => async (dispatch) => {
  dispatch({ type: "LOADING", payload: true });
  try {
    const response = await axios.get(
      "http://localhost:5000/api/user/getAllUsers"
    );
    console.log(response.data);
    dispatch({ type: "LOADING", payload: false });
    dispatch({ type: "GET_ALL_USERS", payload: response.data });
  } catch (error) {
    console.log(error);
    dispatch({ type: "LOADING", payload: false });
  }
};

export const followUser = (values) => async (dispatch) => {
  dispatch({ type: "FOLLOW_LOADING", payload: true });
  try {
    const response = await axios.post(
      "http://localhost:5000/api/user/followuser",
      values
    );
    console.log(response.data);
    dispatch({ type: "FOLLOW_LOADING", payload: false });

    message.success("Followed Successfully");
  } catch (error) {
    console.log(error);
    dispatch({ type: "FOLLOW_LOADING", payload: false });
    message.error("something went wrong");
  }
};

export const UnfollowUser = (values) => async (dispatch) => {
  dispatch({ type: "UNFOLLOW_LOADING", payload: true });
  try {
    const response = await axios.post(
      "http://localhost:5000/api/user/unfollowuser",
      values
    );
    console.log(response.data);
    dispatch({ type: "UNFOLLOW_LOADING", payload: false });

    message.success("Unfollowed Successfully");
  } catch (error) {
    console.log(error);
    dispatch({ type: "UNFOLLOW_LOADING", payload: false });
    message.error("something went wrong");
  }
};

export const userEdit = (values) => async (dispatch) => {
  console.log(values);
  dispatch({ type: "LOADING", payload: true });
  try {
   const response =  await axios.patch("http://localhost:5000/api/user/edit", values);
    dispatch({ type: "LOADING", payload: false });
    message.success("Profil Edited successfully");
    localStorage.setItem('user',JSON.stringify(response.data))
    window.location.href = `/profile/${response.data._id}`
  } catch (error) {
    console.log(error);
    dispatch({ type: "LOADING", payload: false });
    message.error("something went wrong");
  }
};
