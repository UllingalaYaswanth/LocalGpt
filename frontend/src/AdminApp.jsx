import React, { useState } from 'react';
import { Layout } from 'antd';
import { Routes, Route } from 'react-router-dom';
import AdminSidebar from './Admin/AdminSidebar';
import Home from './Admin/AdminHome';
import Datasource from './Admin/Datasource';
import AdminDoc from './Admin/AdminDoc';
import AdminAcc from './Admin/AdminAcc';
import AdminGroups from './Admin/AdminGroups';
import './App.css';

const { Sider, Content } = Layout;

const AdminApp = () => {
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
        <AdminSidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar} />
      </Sider>
      <Layout style={{ marginLeft: openSidebarToggle ? collapsedSidebarWidth : sidebarWidth }}>
        <Content style={{ padding: '0 24px', marginTop: 64 }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="datasource" element={<Datasource />} />
            <Route path="AdminDoc" element={<AdminDoc />} />
            <Route path="AdminAcc" element={<AdminAcc />} />
            <Route path="AdminGroups" element={<AdminGroups />} />
          </Routes>
        </Content>
      </Layout>
    </Layout>
  );
};

export default AdminApp;
