// User Role---------------------------------------------


// import React, { useState } from 'react';
// import Sidebar from './User/Sidebar';
// import MainBody from './User/MainBody';
// import './App.css';

// const App = () => {
//   const [history, setHistory] = useState([]);
//   const [user, setUser] = useState({
//     name: "Vijay Govind",
//     email: "john@example.com"
//   });

//   const addToHistory = (query) => {
//     setHistory([query, ...history]);
//   };

//   return (
//     <div className="app">
//       <Sidebar history={history} user={user} />
//       <MainBody addToHistory={addToHistory} user={user} />
//       {/* <Datasource/> */}
  
//     </div>
//   );
// };

// export default App;




// Admin Role-------------------------------------------------------------------------------


import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from 'antd';
import AdminSidebar from './Admin/AdminSidebar';
import Home from './Admin/AdminHome'; 
import Datasource from './Admin/Datasource'; 
import './App.css';
import AdminDoc from './Admin/AdminDoc';
import AdminAcc from './Admin/AdminAcc';
import AdminCreate from './Admin/AdminAccCreate';
import AdminManage from './Admin/AdminAccManage';
import AdminGroups from './Admin/AdminGroups'

const { Sider, Content } = Layout;

function App() {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  };

  const sidebarWidth = 250; 
  const collapsedSidebarWidth = 80;

  return (
    <BrowserRouter>
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
              <Route path="/datasource" element={<Datasource />} />
              <Route path='/AdminDoc' element={<AdminDoc/>} />
              <Route path='/AdminAcc' element={<AdminAcc/>} />
              <Route path='/AdminAccCreate' element={<AdminCreate/>} />
              <Route path='/AdminAccManage' element={<AdminManage/>} />
              <Route path='/AdminGroups' element={<AdminGroups/>} />
            </Routes>
          </Content>
        </Layout>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
