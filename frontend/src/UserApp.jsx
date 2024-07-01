// import React, { useState } from 'react';
// import { Routes, Route } from 'react-router-dom';
// import Sidebar from './User/Sidebar';
// import MainBody from './User/MainBody';
// import './App.css';

// const UserApp = () => {
//   const [history, setHistory] = useState([]);
//   const [messages, setMessages] = useState([]);
//   const [user, setUser] = useState({
//     name: "Vijay Govind",
//     email: "john@example.com"
//   });

//   const addToHistory = (messagesToAdd) => {
//     setHistory([...history, messagesToAdd]);
//   };

//   const handleNewChat = () => {
//     addToHistory(messages); // Add current chat messages to history
//     setMessages([]); // Clear current chat messages
//   };

//   const loadChat = (messages) => {
//     setMessages(messages); // Load chat messages into MainBody
//   };

//   return (
//     <div className="app">
//       <Sidebar history={history} user={user} loadChat={loadChat} handleNewChat={handleNewChat}/>
//       <Routes>
//         <Route path="/" element={<MainBody addToHistory={addToHistory} user={user} />} />
//       </Routes>
//     </div>
//   );
// };

// export default UserApp;


import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Sidebar from './User/Sidebar';
import MainBody from './User/MainBody';
import './App.css';

const UserApp = () => {
  const [history, setHistory] = useState([]);
  const [messages, setMessages] = useState([]);
  const [user, setUser] = useState({
    name: "Vijay Govind",
    email: "john@example.com"
  });

  const addToHistory = (messagesToAdd) => {
    setHistory([...history, messagesToAdd]);
  };
  
  const handleNewChat = () => {
    addToHistory(messages); // Add current chat messages to history
    setMessages([]); // Clear current chat messages
  };

  const loadChat = (messages) => {
    setMessages(messages); // Load chat messages into MainBody
  };

  const handleRename = (index) => {
    const newName = prompt('Enter a new name for the chat:');
    if (newName) {
      const updatedHistory = history.map((item, idx) => idx === index ? { ...item, name: newName } : item);
      setHistory(updatedHistory);
    }
  };

  const handleDelete = (index) => {
    const updatedHistory = history.filter((_, idx) => idx !== index);
    setHistory(updatedHistory);
  };

  const handleArchive = (index) => {
    console.log(`Archive clicked for index ${index}`);
    // Implement your archive functionality here
  };

  return (
    <div className="app">
      <Sidebar 
        history={history} 
        user={user} 
        loadChat={loadChat} 
        handleNewChat={handleNewChat} 
        handleRename={handleRename} 
        handleDelete={handleDelete} 
        handleArchive={handleArchive}
      />
      <Routes>
        <Route path="/" element={<MainBody addToHistory={addToHistory} user={user} initialMessages={messages} />} />
      </Routes>
    </div>
  );
};

export default UserApp;
