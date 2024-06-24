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
import AdminSidebar from './Admin/AdminSidebar'; // Ensure this is the correct path
import Home from './Admin/AdminHome'; // Ensure this is the correct path
import Datasource from './Admin/Datasource'; // Ensure this is the correct path
import './App.css';
import DevSidebar from './Developer/DevSidebar'
import DevHome from './Developer/DevHome'

const { Sider, Content } = Layout;

function App() {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  };

  return (
    <BrowserRouter>
      <Layout style={{ minHeight: '100vh' }}>
        <Sider
          collapsible
          collapsed={openSidebarToggle}
          onCollapse={OpenSidebar}
          trigger={null}
          style={{ position: 'fixed', height: '100vh' }}
        >
          <AdminSidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar} />
        </Sider>
        <Layout style={{ marginLeft: openSidebarToggle ? 80 : 200 }}>
          <Content style={{ padding: '0 24px', marginTop: 64 }}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/datasource" element={<Datasource />} />
            </Routes>
          </Content>
        </Layout>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
