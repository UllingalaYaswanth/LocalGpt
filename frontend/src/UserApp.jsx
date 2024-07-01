import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Sidebar from './User/Sidebar';
import MainBody from './User/MainBody';
import './App.css';

const UserApp = () => {
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
      <Routes>
        <Route path="/" element={<MainBody addToHistory={addToHistory} user={user} />} />
      </Routes>
    </div>
  );
};

export default UserApp;
