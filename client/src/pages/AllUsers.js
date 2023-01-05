import { Button, Row, Col, Input } from "antd";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import DefaultLayout from "../Components/DefaultLayout";
import {
  followUser,
  getAllUsers,
  UnfollowUser,
} from "../Redux/action/userAction";
import { UserAddOutlined, CheckOutlined } from "@ant-design/icons";

const AllUsers = () => {
  const [searchKey, setsearchKey] = useState("");
  const { users } = useSelector((state) => state.userReducers);
  const currentUser = JSON.parse(localStorage.getItem("user"));
  const dispatch = useDispatch();
  const { followloading, unfollowloading } = useSelector(
    (state) => state.alertsReducers
  );
  // console.log("currentUser",currentUser);
  // console.log("UsresList",users);
  //call api
  useEffect(() => {
    dispatch(getAllUsers());
  }, [followloading, unfollowloading]);
  return (
    <DefaultLayout>
      <div>
        <Row justify="center">
          <Col lg={20} className="d-flex mt-3">
            <Input
             className="search-users"
              onChange={(e) => setsearchKey(e.target.value)}
              placeholder= "Search users"
            />
          </Col>
        </Row>
        <Row justify="center" gutter={16} className="mt-5">
          {users &&
            users
              .filter((obj) =>
                obj.username.toLowerCase().includes(searchKey.toLowerCase())
              )
              .map((user) => {
                return (
                  <>
                    {currentUser._id !== user._id && (
                      <Col lg={5} xs={24} className="text-left">
                        <div key={user._id} className="bs1 p-2">
                          {user.profilepicUrl === "" ? (
                            <span className="profilepic1 d-flex align-items-center">
                              {user.username[0]}
                            </span>
                          ) : (
                            <img
                              src={user.profilepicUrl}
                              alt=""
                              height="60"
                              width="60"
                            />
                          )}
                          <div>
                            <Link to={`/profile/${user._id}`}>
                              {user.username}
                            </Link>
                          </div>
                          <p>{moment(user.createdAt).format("MMM DD yyyy")}</p>
                          {user.followers.find(
                            (obj) => obj === currentUser._id
                          ) ? (
                            <div className="d-flex">
                              <Button icon={<CheckOutlined />}>
                                Following
                              </Button>
                              <Button
                                onClick={() =>
                                  dispatch(
                                    UnfollowUser({
                                      currentUserId: currentUser._id,
                                      receiverUserId: user._id,
                                    })
                                  )
                                }
                                className="ml-2"
                              >
                                Unfollow
                              </Button>
                            </div>
                          ) : (
                            <Button
                              icon={<UserAddOutlined />}
                              onClick={() =>
                                dispatch(
                                  followUser({
                                    currentUserId: currentUser._id,
                                    receiverUserId: user._id,
                                  })
                                )
                              }
                            >
                              Follow
                            </Button>
                          )}
                        </div>
                      </Col>
                    )}
                  </>
                );
              })}
        </Row>
      </div>
    </DefaultLayout>
  );
};

export default AllUsers;
