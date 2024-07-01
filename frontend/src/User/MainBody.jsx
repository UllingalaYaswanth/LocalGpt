import React, { useRef, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BiPlusCircle } from 'react-icons/bi';
import '../App.css';

const MainBody = ({ addToHistory, user }) => {
  const [query, setQuery] = useState('');
  const fileInputRef = useRef(null);

  const handleKeyPress = (event) => {
    if (event.key === 'Enter' && query.trim() !== '') {
      addToHistory(query.trim());
      setQuery('');
    }
  };

  const handleAddDocument = () => {
    fileInputRef.current.click(); 
  };

  const handleFileChange = (event) => {
    const files = event.target.files;
    console.log(files);
  };

  return (
    <div className="main-body d-flex align-items-center">
      <h1 className="welcome mb-5">{`Welcome ${user.name}`}</h1>
      <div className="input-group1 w-75 d-flex">
        <input
          className="search rounded border border-black"
          id="search"
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="What can I help you with.."
          onKeyPress={handleKeyPress}
        />
        <div className="append">
          <BiPlusCircle
            className="bi bi-plus-circle"
            size={30}
            onClick={handleAddDocument}
            style={{ cursor: 'pointer' }}
          />
          <input
            type="file"
            ref={fileInputRef}
            style={{ display: 'none' }}
            onChange={handleFileChange}
          />
        </div>
      </div>
    </div>
  );
};

export default MainBody;
