import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Row, Col, Form, Input, Button } from "antd";
import DefaultLayout from "../Components/DefaultLayout";
import "../index.css";
import { userPost } from "../Redux/action/postAction";
const { TextArea } = Input;
const AddPost = () => {
  const dispatch = useDispatch()
  const [image, setImage] = useState();
  const handleImage = (e) => {
    const file = e.target.files[0];
    // console.log(file)
    const reader = new FileReader(file);
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      // console.log(reader.result);
      setImage(reader.result);
    };
  };


  const addPost = (values)=>{
    values.image = image
    // console.log(values)
    dispatch(userPost(values))

  }
  return (
    <DefaultLayout>
      <Row justify="center">
        <Col lg={12}>
          <Form className="bs1 p-3 mt-5" layout="vertical " onFinish={addPost}>
            <h3>Add new post</h3>
            <Form.Item
              name="description"
              label="Description"
              rules={[{ required: true }]}
            >
              <TextArea />
            </Form.Item>
            <Form.Item name="image" label="Image" rules={[{ required: true }]}>
              <Input type="file" onChange={handleImage} />
            </Form.Item>
            {image !== "" && <img src={image} alt='' height="200" width="200" />}
            <br />
            <div>
              <Button type="primary" htmlType="submit">
                Post
              </Button>
            </div>
          </Form>
        </Col>
      </Row>
    </DefaultLayout>
  );
};

export default AddPost;
