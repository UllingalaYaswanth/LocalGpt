// import React, { useRef, useState } from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import { BiPlusCircle } from 'react-icons/bi';
// import '../App.css';

// const MainBody = ({ addToHistory, user }) => {
//   const [query, setQuery] = useState('');
//   const fileInputRef = useRef(null);

//   const handleKeyPress = (event) => {
//     if (event.key === 'Enter' && query.trim() !== '') {
//       addToHistory(query.trim());
//       setQuery('');
//     }
//   };

//   const handleAddDocument = () => {
//     fileInputRef.current.click(); 
//   };

//   const handleFileChange = (event) => {
//     const files = event.target.files;
//     console.log(files);
//   };

//   return (
//     <div className="main-body d-flex align-items-center">
//       <h1 className="welcome mb-5">{`Welcome ${user.name}`}</h1>
//       <div className="input-group1 w-75 d-flex">
//         <input
//           className="search rounded border border-black"
//           id="search"
//           type="text"
//           value={query}
//           onChange={(e) => setQuery(e.target.value)}
//           placeholder="What can I help you with.."
//           onKeyPress={handleKeyPress}
//         />
//         <div className="append">
//           <BiPlusCircle
//             className="bi bi-plus-circle"
//             size={30}
//             onClick={handleAddDocument}
//             style={{ cursor: 'pointer' }}
//           />
//           <input
//             type="file"
//             ref={fileInputRef}
//             style={{ display: 'none' }}
//             onChange={handleFileChange}
//           />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default MainBody;


// import React, { useState } from 'react';
// import axios from 'axios';
// import '../App.css';

// function MainBody() {
//   const [messages, setMessages] = useState([]);
//   const [input, setInput] = useState('');

//   const sendMessage = async () => {
//     if (input.trim() === '') return;

//     const newMessage = { user: 'user', text: input };
//     setMessages([...messages, newMessage]);

//     setInput('');

//     // Send the message to the server
//     try {
//       const response = await axios.post('http://localhost:8081/api/chat', { message: input });
//       const botMessage = { user: 'bot', text: response.data.reply };
//       setMessages(prevMessages => [...prevMessages, botMessage]);
//     } catch (error) {
//       console.error("Error sending message:", error);
//       const errorMessage = { user: 'bot', text: "Sorry, something went wrong. Please try again later." };
//       setMessages(prevMessages => [...prevMessages, errorMessage]);
//     }
//   };

//   return (
//     <div className="chat-window">
//       <div className="messages">
//         {messages.map((msg, index) => (
//           <div key={index} className={`message ${msg.user}`}>
//             {msg.text}
//           </div>
//         ))}
//       </div>
//       <div className="input-box">
//         <input
//           type="text"
//           value={input}
//           onChange={(e) => setInput(e.target.value)}
//           onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
//         />
//         <button onClick={sendMessage}>Send</button>
//       </div>
//     </div>
//   );
// }

// export default MainBody;


import React, { useRef, useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BiPlusCircle } from 'react-icons/bi';
import { FaPaperPlane } from 'react-icons/fa';
import axios from 'axios';
import '../App.css';

const MainBody = ({ user, addToHistory, initialMessages }) => {
  const [query, setQuery] = useState('');
  const [messages, setMessages] = useState(initialMessages || []);
  const [chatActive, setChatActive] = useState(false); // State to track if chat is active
  const fileInputRef = useRef(null);

  const handleKeyPress = async (event) => {
    if (event.key === 'Enter' && !event.shiftKey && query.trim() !== '') {
      await sendMessage();
    }
  };

  const sendMessage = async () => {
    if (query.trim() === '') return;

    const userMessage = { user: 'user', text: query.trim() };
    setMessages([...messages, userMessage]);
    setQuery('');

    try {
      const response = await axios.post('http://localhost:8081/api/chat', { message: query.trim() });
      const botMessage = { user: 'bot', text: response.data.reply };
      setMessages(prevMessages => [...prevMessages, botMessage]);
    } catch (error) {
      console.error("Error sending message:", error);
      const errorMessage = { user: 'bot', text: "Sorry, something went wrong. Please try again later." };
      setMessages(prevMessages => [...prevMessages, errorMessage]);
    }
  };

  const handleAddDocument = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const files = event.target.files;
    console.log(files);
  };

  // Function to handle chat window focus/blur
  const handleChatFocus = () => {
    setChatActive(true);
  };

  const handleChatBlur = () => {
    setChatActive(false);
  };

  useEffect(() => {
    setMessages(initialMessages || []);
  }, [initialMessages]);

  return (
    <div className="main-body d-flex flex-column align-items-center ">
      {!chatActive && messages.length === 0 && <h1 className="welcome mb-5">{`Welcome ${user.name}`}</h1>}
      <div className="chat-window w-75 mb-2 justify-content-center" onFocus={handleChatFocus} onBlur={handleChatBlur}>
        <div className="messages p-3 rounded">
          {messages.map((msg, index) => (
            <div key={index} className={`message ${msg.user}`}>
              {msg.text}
            </div>
          ))}
        </div>
      </div>
      <div className="input-group1 w-75 position-relative">
        <input
          className="search form-control rounded border border-black"
          id="search"
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="What can I help you with.."
          onKeyPress={handleKeyPress}
        />
        <FaPaperPlane
          className="fa fa-paper-plane position-absolute"
          size={24}
          onClick={sendMessage}
          style={{ cursor: 'pointer', top: '50%', right: '10px', transform: 'translateY(-50%)' }}
        />
        <div className="append position-absolute" style={{ top: '60%', left: '0px', transform: 'translateY(-50%)' }}>
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
