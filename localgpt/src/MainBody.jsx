import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BiPlusCircle } from 'react-icons/bi'; // Import BiPlusCircle icon from react-icons/bi
import './App.css';

const MainBody = ({ addToHistory, user }) => {
  const [query, setQuery] = useState('');

  const handleKeyPress = (event) => {
    if (event.key === 'Enter' && query.trim() !== '') {
      addToHistory(query.trim());
      setQuery('');
    }
  };

  const handleAddDocument = () => {
    // Example function for adding documents
    console.log('Adding documents...');
    // Implement your logic to add documents here
  };

  return (
    <div className="main-body d-flex align-items-center">
      <h1 className='welcome mb-5'>{`Welcome ${user.name}`}</h1>
      <div className="input-group w-75 d-flex">
        <input
          className='search rounded border border-black'
          id='search'
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="What can I help you with.."
          onKeyPress={handleKeyPress}
        />
        <div className="input-group-append">
          <BiPlusCircle
            className="bi bi-plus-circle"
            size={30}
            onClick={handleAddDocument}
            style={{ cursor: 'pointer' }}
          />
        </div>
      </div>
    </div>
  );
};

export default MainBody;
