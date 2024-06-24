import React, { useState } from 'react';
import Sidebar from './Sidebar';
import MainBody from './MainBody';
import './App.css';

const App = () => {
  const [history, setHistory] = useState([]);
  const [user, setUser] = useState({
    name: "Vijay Govind",
    email: "john@example.com"
  });

  const addToHistory = (query) => {
    setHistory([query, ...history]);
  };

  return (
    <div className="app">
      <Sidebar history={history} user={user} />
      <MainBody addToHistory={addToHistory} user={user} />
  
    </div>
  );
};

export default App;

// import { useState } from 'react'
// import './App.css'
// import Header from './Header'
// import Sidebar from './Sidebar'
// import Home from './AdminHome'
// import AdminSidebar from './AdminSidebar'

// function App() {
//   const [openSidebarToggle, setOpenSidebarToggle] = useState(false)

//   const OpenSidebar = () => {
//     setOpenSidebarToggle(!openSidebarToggle)
//   }

//   return (
//     <div className='grid-container'>
//       {/* <Header OpenSidebar={OpenSidebar}/> */}
//       <AdminSidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar}/>
//       <Home />
//     </div>
//   )
// }

// export default App
