import React from "react";
import { Row, Col, Form, Input, Button } from "antd";
import "../index.css";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { userRegister } from "../Redux/action/userAction";
const Register = () => {
    const dispatch = useDispatch()
  const registerHandler = (values) => {
  
    dispatch(userRegister(values))
  };
  return (
    <div className="register-wrapper">
      <Row justify="center" className="register-div align-items-center">
        <Col lg={5} sm={24} xs={24}>
         <h1 className="left-title mr-3">SHEY</h1>
        </Col>
        <Col lg={10} xs={24}>
          <Form
            layout="vertical"
            className="bs1 p-3"
            onFinish={registerHandler}
          >
            <h3>Register</h3>
            <Form.Item
              label="username"
              name="username"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="password"
              name="password"
              rules={[{ required: true }]}
            >
              <Input type="password"/>
            </Form.Item>
            <Form.Item
              label="confirm password"
              name="cpassword"
              rules={[{ required: true }]}
            >
              <Input type="password" />
            </Form.Item>
            <div>
            <Button type="primary" htmlType="submit">
              {" "}
              Register{" "}
            </Button>
            </div>
            <Link to='/login'>Already registered , click here to login </Link>
          </Form>
        </Col>
        <Col lg={5} sm={24} xs={24}>
         <h1 className="right-title ml-3">GRAM</h1>
        </Col>
      </Row>
    </div>
  );
};

export default Register;
