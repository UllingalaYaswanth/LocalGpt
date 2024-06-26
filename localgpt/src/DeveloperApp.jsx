import React, { useState } from 'react';
import { Layout } from 'antd';
import { Routes, Route } from 'react-router-dom';
import Sidebar from './Developer/DevSidebar';
import Home from './Developer/DevHome';
import DevManage from './Developer/DevManage';
import DevUpload from './Developer/DevUpload';
import './App.css';

const { Sider, Content } = Layout;

const DeveloperApp = () => {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);
  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  };
  const sidebarWidth = 250; 
  const collapsedSidebarWidth = 80;

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider
        collapsible
        collapsed={openSidebarToggle}
        onCollapse={OpenSidebar}
        trigger={null}
        width={sidebarWidth}
        collapsedWidth={collapsedSidebarWidth}
        style={{ position: 'fixed', height: '100vh' }}
      >
        <Sidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar} />
      </Sider>
      <Layout style={{ marginLeft: openSidebarToggle ? collapsedSidebarWidth : sidebarWidth }}>
        <Content style={{ padding: '0 24px', marginTop: 64 }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="DevManage" element={<DevManage/>} />
            <Route path="DevUpload" element={<DevUpload/>} />
          </Routes>
        </Content>
      </Layout>
    </Layout>
  );
};

export default DeveloperApp;
