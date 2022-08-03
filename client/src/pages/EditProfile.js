import { Button, Col, Form, Input, Row, Select } from "antd";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import DefaultLayout from "../Components/DefaultLayout";
import { userEdit } from "../Redux/action/userAction";

const EditProfile = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const [profilePicUrl, setprofilePicUrl] = useState(user.profilepicUrl);
  const dispatch = useDispatch();
  const handleImage = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader(file);
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setprofilePicUrl(reader.result);
    };
  };

  const edit = (value) => {
    value.profilepicUrl = profilePicUrl;
    value._id = user._id;
    dispatch(userEdit(value));
  };

  return (
    <DefaultLayout>
      <Row justify="center mt-5">
        <Col lg={10} xs={24} sm={24} className="mt-5">
          <Form
            layout="vertical"
            initialValues={user}
            className="p-2 bs1"
            onFinish={edit}
          >
            <h3>Edit Profile</h3>
            <Form.Item name="username" label="Username">
              <Input />
            </Form.Item>
            <Form.Item name="bio" label="Bio">
              <Input />
            </Form.Item>
            <Form.Item name="profilepicUrl" label="Profile Pic Url">
              <div className="d-flex align-items-center">
                {profilePicUrl === "" ? (
                  <span className="profilepic1 d-flex align-items-center">
                    {user.username[0]}
                  </span>
                ) : (
                  <img height="60" width="60" src={profilePicUrl} alt="" />
                )}
                <Input type="file" onChange={handleImage} />
              </div>
            </Form.Item>
            <Form.Item name="privateAccount" label="Private account">
              <Select>
                <Select.Option value={true}>Private</Select.Option>
                <Select.Option value={false}>Public</Select.Option>
              </Select>
            </Form.Item>
            <Button htmlType="submit">Edit</Button>
          </Form>
        </Col>
      </Row>
    </DefaultLayout>
  );
};

export default EditProfile;
