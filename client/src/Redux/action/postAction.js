import axios from "axios";
import { message } from "antd";
export const userPost = (values) => async (dispatch) => {
  console.log(values);
  values.user = JSON.parse(localStorage.getItem("user"))._id;
  values.likes = [];
  values.comments = [];
  dispatch({ type: "LOADING", payload: true });
  try {
    await axios.post("http://localhost:5000/api/posts/addpost", values);
    dispatch({ type: "LOADING", payload: false });
    message.success("post added successfully");
    window.location.href = "/";
  } catch (error) {
    console.log(error);
    dispatch({ type: "LOADING", payload: false });
    message.error("something went wrong");
  }
};

export const getAllPost = (userId) => async (dispatch) => {
  console.log(userId);
  dispatch({ type: "LOADING", payload: true });
  try {
    const response = await axios.post(
      "http://localhost:5000/api/posts/getallposts",
      userId
    );
    console.log(response.data);
    dispatch({ type: "LOADING", payload: false });
    dispatch({ type: "GET_ALL_POSTS", payload: response.data });
  } catch (error) {
    console.log(error);
    dispatch({ type: "LOADING", payload: false });
  }
};

export const likeorunlikepost = (value) => async (dispatch) => {
  value.userId = JSON.parse(localStorage.getItem("user"))._id.toString();
  // console.log(userId)

  dispatch({ type: "LIKE_UNLIKE_LOADING", payload: true });
  try {
    await axios.post("http://localhost:5000/api/posts/likeorunlike", value);
    //  console.log(response.data)
    dispatch({ type: "LIKE_UNLIKE_LOADING", payload: false });
  } catch (error) {
    console.log(error);
    dispatch({ type: "LIKE_UNLIKE_LOADING", payload: false });
    message.error("something went wrong");
  }
};

export const addComment = (value) => async (dispatch) => {
  value.userId = JSON.parse(localStorage.getItem("user"))._id.toString();
  // console.log(userId)

  dispatch({ type: "ADD_COMMENT_LOADING", payload: true });
  try {
    await axios.post("http://localhost:5000/api/posts/addcomment", value);
    //  console.log(response.data)
    dispatch({ type: "ADD_COMMENT_LOADING", payload: false });
  } catch (error) {
    console.log(error);
    dispatch({ type: "ADD_COMMENT_LOADING", payload: false });
    message.error("something went wrong");
  }
};

export const EditPost = (values) => async (dispatch) => {
  console.log(values);
  
  dispatch({ type: "LOADING", payload: true });
  try {
    await axios.post("http://localhost:5000/api/posts/editpost", values);
    dispatch({ type: "LOADING", payload: false });
    message.success("post edited successfully");
  } catch (error) {
    console.log(error);
    dispatch({ type: "LOADING", payload: false });
    message.error("something went wrong");
  }
};

export const deletePost = (values) => async (dispatch) => {
  console.log(values);
  
  dispatch({ type: "DELETE_LOADING", payload: true });
  try {
    await axios.post("http://localhost:5000/api/posts/deletepost", values);
    dispatch({ type: "DELETE_LOADING", payload: false });
    message.success("post deleted successfully");
  } catch (error) {
    console.log(error);
    dispatch({ type: "DELETE_LOADING", payload: false });
    message.error("something went wrong");
  }
};
