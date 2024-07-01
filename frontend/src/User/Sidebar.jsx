// import React, { useState } from 'react';
// import '../App.css';

// const Sidebar = ({ history, user }) => {
//   const [showDropdown, setShowDropdown] = useState({});

//   const toggleDropdown = (index) => {
//     setShowDropdown((prev) => ({
//       ...prev,
//       [index]: !prev[index],
//     }));
//   };
//   const handlenewchart = () =>{
//     location.reload();
//   }

//   const handleRename = (index) => {
//     console.log(`Rename clicked for index ${index}`);
//   };

//   const handleDelete = (index) => {
//     console.log(`Delete clicked for index ${index}`);
//   };

//   const handleArchive = (index) => {
//     console.log(`Archive clicked for index ${index}`);
//   };

//   const handleSignout = () => {
//     console.log("Signout clicked");
//   };

//   return (
//     <div className="sidebar">
//       <div className="user-details">
//         <img src="../src/assets/img/llm.webp" className="user-image mb-2" alt="User" />
//         <div className="user-info">
//           <p><strong>{user.name}</strong></p>
//         </div>
//       </div>

//       <button onClick={handlenewchart} className="btn border border-black">New Chart</button>

//       <h2><strong>History</strong></h2>
//       <ul className="history-list">
//         {history.map((query, index) => (
//           <li className="history-item" key={index}>
//             <span>{query}</span>
//             <div className="dropdown-container">
//               <span className="three-dots" onClick={() => toggleDropdown(index)}>⋯</span>
//               {showDropdown[index] && (
//                 <div className="dropdown">
//                   <p onClick={() => handleRename(index)}>Rename</p>
//                   <p onClick={() => handleDelete(index)}>Delete</p>
//                   <p onClick={() => handleArchive(index)}>Archive</p>
//                 </div>
//               )}
//             </div>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default Sidebar;



import React, { useState } from 'react';
import '../App.css';

const Sidebar = ({ history, user, loadChat, handleNewChat, handleRename, handleDelete, handleArchive }) => {
  const [showDropdown, setShowDropdown] = useState({});

  const toggleDropdown = (index) => {
    setShowDropdown((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  return (
    <div className="sidebar">
      <div className="user-details">
        <img src="../src/assets/img/llm.webp" className="user-image mb-2" alt="User" />
        <div className="user-info">
          <p><strong>{user.name}</strong></p>
        </div>
      </div>

      <div className='history'>
        <button onClick={handleNewChat} className="btn border border-black newchat">New Chat</button>
        <h2><strong>History</strong></h2>
        <ul className="history-list">
          {history.map((chatHistory, index) => (
            <li className="history-item" key={index} onClick={() => loadChat(chatHistory)}>
              <span>Chat {index + 1}</span>
              <div className="dropdown-container">
                <span className="three-dots" onClick={() => toggleDropdown(index)}>⋯</span>
                {showDropdown[index] && (
                  <div className="dropdown">
                    <p onClick={() => handleRename(index)}>Rename</p>
                    <p onClick={() => handleDelete(index)}>Delete</p>
                    <p onClick={() => handleArchive(index)}>Archive</p>
                  </div>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;

