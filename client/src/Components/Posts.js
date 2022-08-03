import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import "../index.css";
import moment from "moment";
import {
  HeartFilled,
  CommentOutlined,
  DeleteOutlined,
  EditOutlined,
} from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import {
  addComment,
  EditPost,
  getAllPost,
  likeorunlikepost,
  deletePost
} from "../Redux/action/postAction";
import { Col, Modal, Row, Input } from "antd";

const { TextArea } = Input;

const Posts = ({ post, postInProfilePage }) => {
  const [addCommentModal, setaddCommentModal] = useState(false);
  const [addEditModal, setaddEditModal] = useState(false);
  const [description, setDescription] = useState(post.description);

  const [comment, setcomment] = useState("");
  const dispatch = useDispatch();
  const { likeorunlikeloading,addcommentloading,deleteloading } = useSelector((state) => state.alertsReducers);
  const { users } = useSelector((state) => state.userReducers);
  const currentUser = JSON.parse(localStorage.getItem("user"));
  const alreadyLiked = post.likes.find(
    (obj) => obj.user.toString() === currentUser._id
  );

  const modalHandler = () => {
    setaddCommentModal(true);
  };
  useEffect(() => {
    dispatch(getAllPost());
  }, [likeorunlikeloading,addcommentloading,deleteloading]);

  return (
    <div className="bs1 p-2 mt-3">
      <div className="d-flex justify-content-between align-items-center bs-1">
        <div className="d-flex align-items-center">
          {post.user.profilepicUrl === "" ? (
            <span className="profilepic1">{post.user.username[0]}</span>
          ) : (
            <img
              src={post.user.profilepicUrl}
              alt=""
              height="35"
              width="35"
              style={{ borderRadius: "50%" }}
            />
          )}
          <NavLink to="" className="ml-2">
            {post.user.username}
          </NavLink>
        </div>
        <div>
          <p>{moment(post.createdAt).format("MMM DD yyyy")}</p>
        </div>
      </div>
      <img
        src={post.image}
        alt=""
        className="postimage w-100"
        style={{
          height: postInProfilePage == true && "200px",
          borderRadius: "2%",
        }}
      />
      <p className=" mt-1 mb-1 text-left">{post.description}</p>
      <div
        className={
          postInProfilePage == true
            ? "d-flex align-items-center justify-content-between"
            : "d-flex align-items-center"
        }
      >
        <div className="d-flex align-items-center">
          <HeartFilled
            style={{ color: alreadyLiked ? "red" : "grey" }}
            onClick={() => dispatch(likeorunlikepost({ postId: post._id }))}
          />
          <p>{post.likes.length}</p>
        </div>
        <div className="d-flex align-items-center">
          <CommentOutlined onClick={modalHandler} />
          <p>{post.comments.length}</p>
        </div>

        {post.user._id === currentUser._id && postInProfilePage == true && (
          <>
            <div>
              <DeleteOutlined onClick={() => dispatch(deletePost({postId : post._id}))} />
            </div>
            <div>
              <EditOutlined onClick={() => setaddEditModal(true)} />
            </div>
          </>
        )}
      </div>

      <Modal
        visible={addCommentModal}
        title="Commnets"
        closable={false}
        width={900}
        okText="Add Commnet"
        onOk={() => {
          dispatch(addComment({ postId: post._id, comments: comment }));
          setaddCommentModal(false);
        }}
        onCancel={() => {
          setaddCommentModal(false);
        }}
      >
        <Row>
          <Col lg={13} xs={0}>
            <img src={post.image} height="400" className="w-100" />
          </Col>

          <Col lg={11} xs={24}>
            <TextArea
              value={comment}
              placeholder="add your comment here"
              className="ml-2"
              onChange={(e) => setcomment(e.target.value)}
              rows="8"
              t
            />

            {post.comments.map((comment) => {
              const user = users.find((obj) => obj._id === comment.user);
              // console.log(user)
              return (
                <div className="d-flex align-items-center">
                  {/* {user.profilepicUrl === "" ? (
                    <span className="profilepic1">{user.username[0]}</span>
                  ) : (
                    <img src={user.profilepicUrl} alt="" />
                  )} */}
                  {/* <Link to=''>{user.username}</Link> */}
                  <p style={{ fontSize: 15 }}>{comment.comments}</p>
                  <p style={{ fontSize: 15 }}>{comment.date}</p>
                </div>
              );
            })}
          </Col>
        </Row>
      </Modal>
      <Modal
        title="Edit Description"
        closable={false}
        okText="edit"
        onOk={() => {
          dispatch(
            EditPost({
              postId: post._id,
              editedDescription: description,
            })
          );
            setaddEditModal(false);
        }}
        visible={addEditModal}
        onCancel={() => setaddEditModal(false)}
      >
        <Input
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </Modal>
    </div>
  );
};

export default Posts;
