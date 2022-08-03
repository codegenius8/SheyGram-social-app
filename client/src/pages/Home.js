import React from 'react'
import { useSelector } from 'react-redux'
import DefaultLayout from '../Components/DefaultLayout'
import { Row ,Col } from 'antd'
import Posts from '../Components/Posts'
const Home = () => {
  // const {users} =  useSelector(state=>state.userReducers)
  const {posts} =  useSelector(state=>state.postReducers)
  // console.log("home parent")
  return (
    <DefaultLayout>
         <Row justify='center'>
           <Col lg={12} xs={24}>
             {posts && posts.map(post=>{
              //  console.log(post)
               return <Posts key ={ post._id} post={post}/>
             })}
           </Col>

         </Row>
    </DefaultLayout>
  )
}

export default Home