import { AutoComplete, Layout, Menu } from "antd";
import React from "react";
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
  LogoutOutlined,
  HomeOutlined,
  PlusOutlined,
  UsergroupAddOutlined
} from "@ant-design/icons";
import "./DefaultLayout.css";
import { Link } from "react-router-dom";

const { Header, Sider, Content } = Layout;

class DefaultLayout extends React.Component {
  state = {
    collapsed: true,
  };

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };

  render() {
    const user=JSON.parse(localStorage.getItem('user'))
    return (
      <Layout>
        <Layout className="site-layout">
          <Header className="site-layout-background "  style={{
          position : "sticky",
          top : 0,
          left : 0,
          width : "100%",
          padding : 0, 
          zIndex : 9
          
        }}>
           <div className="d-flex justify-content-between align-items-center bs1">
             <div className="d-flex align-item-cente">
             <UserOutlined />
             <h6 className="pt-3">{JSON.parse(localStorage.getItem('user')).username}</h6>
             </div>
               
               <h2 className="logotext pt-1 ">SheyGram</h2>
           {React.createElement(
              this.state.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
              {
                className: "trigger",
                onClick: this.toggle,
              }
            )}
           </div>
          </Header>
          <Content
            className="site-layout-background"
            style={{
            
            }}
          >
            {this.props.children}
          </Content>
        </Layout>
        <Sider style={{
          position : "sticky",
          top : 0,
          bottom : 0,
          overflow : "auto",
          height : "100vh"
        }}  trigger={null} collapsible collapsed={this.state.collapsed}>
          <div className="logo" />
          <Menu theme="dark " mode="inline" defaultSelectedKeys={["1"]}>
            <Menu.Item key="/" icon={<HomeOutlined />}>
              <Link to="/">Home</Link>
            </Menu.Item>
            <Menu.Item key="/profile" icon={<VideoCameraOutlined />}>
              <Link to={`/profile/${user._id}`}>Profile</Link>
            </Menu.Item>
            <Menu.Item key="/addpost" icon={<PlusOutlined />}>
              <Link to="/addpost">AddPost</Link>
            </Menu.Item>
            <Menu.Item key="/allUser" icon={<UsergroupAddOutlined />}>
              <Link to="/allUser">Alluser</Link>
            </Menu.Item>
            <Menu.Item icon={< LogoutOutlined/>}>
              <Link to='' onClick={()=>{localStorage.clear(window.location.reload())}}>Logout</Link>
            </Menu.Item>
          </Menu>
        </Sider>
      </Layout>
    );
  }
}

export default DefaultLayout;
