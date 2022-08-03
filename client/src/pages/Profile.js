import { Button, Col, Modal, Row } from "antd";
import moment from "moment";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import DefaultLayout from "../Components/DefaultLayout";
import Posts from "../Components/Posts";
import "../index.css";
import { UnfollowUser } from "../Redux/action/userAction";
const Profile = () => {
  const Id = useParams();
  const { users } = useSelector((state) => state.userReducers);
  const { posts } = useSelector((state) => state.postReducers);
  const dispatch = useDispatch();
  // console.log("post", posts);
  const user = users.find((obj) => obj._id === Id.userId);
  // console.log("user", user);
  const userPost = posts.filter((obj) => obj.user._id === Id.userId);
  const currentUser = JSON.parse(localStorage.getItem("user"));
  const [FollowersModalDisplay, setFollowersModalDisplay] = useState(false);
  const [FollowingModalDisplay, setFollowingModalDisplay] = useState(false);
  // console.log("userpost", userPost);

  return (
    <DefaultLayout>
      {users.length > 0 && (
        <>
          <Row justify="center">
            <Col lg={12} sm={24} xs={24}>
              <div className="bs1 m-2 p-2 text-left">
                <div className="d-flex align-items-center">
                  {user.profilepicUrl === "" ? (
                    <span className="profilepic1 d-flex align-items-center">
                      {user.username[0]}
                    </span>
                  ) : (
                    <img
                      src={user.profilepicUrl}
                      alt=""
                      width="80"
                      height="80"
                    />
                  )}
                  <div className="text-left">
                    <p style={{ color: "black" }}>{user.username}</p>
                    <p style={{ fontSize: 15 }}>
                      {moment(user.createdAt).format("MMM DD yyy")}
                    </p>
                    {currentUser._id === Id.userId && (
                      <Button>
                        <Link to="/editprofile"> Edit profile</Link>{" "}
                      </Button>
                    )}
                  </div>
                </div>
                <p style={{ color: "black", fontSize: 16 }}>
                  {user.bio === "" ? "Backend Developer" : user.bio}
                </p>
                <div className="text-left">
                  <Button
                    className="mr-2"
                    onClick={() => setFollowersModalDisplay(true)}
                  >
                    Followers : {user.followers.length}
                  </Button>
                  <Button onClick={() => setFollowingModalDisplay(true)}>
                    Following : {user.following.length}
                  </Button>
                </div>
                <p style={{ color: "black", fontSize: 16 }}>
                  {" "}
                  Total Posts : {userPost.length}
                </p>
              </div>
            </Col>
          </Row>
          {(user.followers.find((obj) => obj === currentUser._id) ||
            user.privateAccount === false ||
            user._id === currentUser._id) ? (
            <Row gutter={16} justify ="center">
              {userPost.map((post) => (
                <Col lg={5} sm={24} xs={24}>
                  <Posts post={post} postInProfilePage={true} />
                </Col>
              ))}
            </Row>
          ) : (<p> This account is private</p>)}
          <Modal
            title="Followers"
            visible={FollowersModalDisplay}
            closable={false}
            onCancel={() => {
              setFollowersModalDisplay(false);
            }}
            onOk={() => {
              setFollowersModalDisplay(false);
            }}
          >
            {user.followers.map((obj) => {
              const followerUser = users.find((o) => o._id === obj);
              return (
                <div className="d-flex align-items-center bs1 p-2">
                  {followerUser.profilepicUrl === "" ? (
                    <span className="profilepic1">
                      {followerUser.username[0]}
                    </span>
                  ) : (
                    <img
                      src={followerUser.profilepicUrl}
                      alt=""
                      height="35"
                      width="35"
                      style={{ borderRadius: "50%" }}
                    />
                  )}
                  <div className="ml-2">
                    <div style={{ margin: 2 }}>
                      {" "}
                      <Link to=""> {followerUser.username}</Link>
                    </div>
                    <div style={{ margin: 2 }}>
                      since :{" "}
                      {moment(followerUser.createdAt).format("MMM DD yyyy")}
                    </div>
                  </div>
                </div>
              );
            })}
          </Modal>

          <Modal
            title="Following"
            visible={FollowingModalDisplay}
            closable={false}
            onCancel={() => {
              setFollowingModalDisplay(false);
            }}
            onOk={() => {
              setFollowingModalDisplay(false);
            }}
          >
            {user.following.map((obj) => {
              const followingUser = users.find((o) => o._id === obj);
              return (
                <div className="d-flex align-items-center bs1 p-1">
                  {followingUser.profilepicUrl === "" ? (
                    <span className="profilepic1">
                      {followingUser.username[0]}
                    </span>
                  ) : (
                    <img
                      src={followingUser.profilepicUrl}
                      alt=""
                      height="35"
                      width="35"
                      style={{ borderRadius: "50%" }}
                    />
                  )}
                  <div className="ml-2">
                    <div style={{ margin: 2 }}>
                      {" "}
                      <Link to=""> {followingUser.username}</Link>
                    </div>
                    <div style={{ margin: 2 }}>
                      since :{" "}
                      {moment(followingUser.createdAt).format("MMM DD yyyy")}
                    </div>
                  </div>
                  <div className="d-flex ml-5">
                    <Button
                      onClick={() =>
                        dispatch(
                          UnfollowUser({
                            currentUserId: currentUser._id,
                            receiverUserId: followingUser._id,
                          })
                        )
                      }
                      className="ml-2"
                    >
                      Unfollow
                    </Button>
                  </div>
                </div>
              );
            })}
          </Modal>
        </>
      )}
    </DefaultLayout>
  );
};

export default Profile;
