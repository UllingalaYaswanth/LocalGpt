import React, { useState, useEffect } from 'react';
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
  const [uploadedFiles, setUploadedFiles] = useState([]);

  useEffect(() => {
    fetchUploadedFiles();
  }, []);

  const fetchUploadedFiles = () => {
    fetch('http://localhost:8081/uploads')
      .then(res => res.json())
      .then(data => setUploadedFiles(data))
      .catch(err => console.error(err));
  };

  const handleFileUpload = async (formDataArray) => {
    try {
      const uploadPromises = formDataArray.map(formData =>
        fetch('http://localhost:8081/upload', {
          method: 'POST',
          body: formData
        })
      );

      const responses = await Promise.all(uploadPromises);

      const newFiles = await Promise.all(responses.map(response => response.json()));

      setUploadedFiles([...uploadedFiles, ...newFiles]);
    } catch (error) {
      console.error('Error uploading files:', error);
    }
  };

  const handleDeleteFile = async (fileName) => {
    try {
      const response = await fetch(`http://localhost:8081/delete/${fileName}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setUploadedFiles(uploadedFiles.filter(file => file.fileName !== fileName));
      } else {
        console.error('Delete failed:', response.statusText);
      }
    } catch (error) {
      console.error('Error deleting file:', error);
    }
  };

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
            <Route path="/" element={<Home uploadedFiles={uploadedFiles} />} />
            <Route
              path="/DevManage"
              element={<DevManage uploadedFiles={uploadedFiles} setUploadedFiles={setUploadedFiles} />}
            />
            <Route
              path="/DevUpload"
              element={<DevUpload onFileUpload={handleFileUpload} />}
            />
          </Routes>
        </Content>
      </Layout>
    </Layout>
  );
};

export default DeveloperApp;
