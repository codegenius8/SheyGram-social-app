import React from "react";
import { Row, Col, Form, Input, Button } from "antd";
import "../index.css";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { userLogin } from "../Redux/action/userAction";
//fire login api
const Login = () => {
  const dispatch= useDispatch()
  const loginHandler = (values) => {
    console.log(values);
    dispatch(userLogin(values))

  };
  return (
    <div className="login-wrapper">
      <Row justify="center" className="register-div align-items-center">
      <Col lg={5} sm={24} xs={24}>
         <h1 className="left-title mr-3">SHEY</h1>
        </Col>
        <Col lg={10} xs={24}>
          <Form
            layout="vertical"
            className="bs1 p-3"
            onFinish={loginHandler}
          >
            <h3>Login</h3>
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
            <div>
            <Button type="primary" htmlType="submit">
              {" "}
              Login{" "}
            </Button>
            </div>
            <Link to='/register'> Not yet registered , click here to register</Link>
          </Form>
        </Col>
        <Col lg={5} sm={24} xs={24}>
         <h1 className="right-title ml-3">GRAM</h1>
        </Col>
      </Row>
    </div>
  );
};

export default Login;
