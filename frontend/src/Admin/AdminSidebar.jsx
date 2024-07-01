// import React from 'react';
// import { Link } from 'react-router-dom';
// import {
//   BsGrid1X2Fill,
//   BsFillGrid3X3GapFill,
//   BsListCheck
// } from 'react-icons/bs';
// import { GrDocumentText } from "react-icons/gr";
// import { MdGroups } from "react-icons/md";
// import { IoIosLink } from "react-icons/io";

// function Sidebar({ openSidebarToggle, OpenSidebar }) {
//   return (
//     <aside id="sidebar" className={openSidebarToggle ? "sidebar-responsive" : ""}>
//       <div className='sidebar-title'>
//         <div className='sidebar-brand'>
//           <img src='../src/assets/img/llm.webp' className='icon_header' alt="Logo" /> Govind
//         </div>
//         <span className='icon close_icon bg-primary' onClick={OpenSidebar}>X</span>
//       </div>

//       <ul className='sidebar-list'>
//         <li className='sidebar-list-item'>
//           <Link to="/">
//             <BsGrid1X2Fill className='icon' /> Dashboard
//           </Link>
//         </li>
//         <li className='sidebar-list-item'>
//           <Link to="/AdminAcc">
//             <BsFillGrid3X3GapFill className='icon' /> Accounts
//           </Link>
//         </li>
//         <li className='sidebar-list-item'>
//           <Link to="/AdminDoc">
//             <GrDocumentText className='icon' /> Docs
//           </Link>
//         </li>
//         <li className='sidebar-list-item'>
//           <Link to="/AdminGroups">
//             <MdGroups className='icon' /> Groups
//           </Link>
//         </li>
//         <li className='sidebar-list-item'>
//           <Link to="/datasource">
//             <IoIosLink className='icon' /> Data Sources
//           </Link>
//         </li>
//       </ul>
//     </aside>
//   );
// }

// export default Sidebar;


// import React from 'react';
// import { Link } from 'react-router-dom';
// import {
//   BsGrid1X2Fill,
//   BsFillGrid3X3GapFill,
//   BsListCheck
// } from 'react-icons/bs';
// import { GrDocumentText } from "react-icons/gr";
// import { MdGroups } from "react-icons/md";
// import { IoIosLink } from "react-icons/io";

// function Sidebar({ openSidebarToggle, OpenSidebar }) {
//   return (
//     <aside id="sidebar" className={openSidebarToggle ? "sidebar-responsive" : ""}>
//       <div className='sidebar-title'>
//         <div className='sidebar-brand'>
//           <img src='../src/assets/img/llm.webp' className='icon_header' alt="Logo" /> Govind
//         </div>
//         <span className='icon close_icon bg-primary' onClick={OpenSidebar}>X</span>
//       </div>

//       <ul className='sidebar-list'>
//           <Link to="/admin/" className='text-decoration-none text-black'>
//           <li className='sidebar-list-item'>
//             <BsGrid1X2Fill className='icon' /> Dashboard
//           </li>
//           </Link>
          
//           <Link to="/admin/AdminAcc" className='text-decoration-none text-black'>
//           <li className='sidebar-list-item'>
//             <BsFillGrid3X3GapFill className='icon' /> Accounts
//             </li>
//           </Link>
        
//           <Link to="/admin/AdminDoc" className='text-decoration-none text-black'>
//           <li className='sidebar-list-item'>
//             <GrDocumentText className='icon' /> Docs
//             </li>
//           </Link>
  
//           <Link to="/admin/AdminGroups" className='text-decoration-none text-black'>
//           <li className='sidebar-list-item'>
//             <MdGroups className='icon' /> Groups
//             </li>
//           </Link>

//           <Link to="/admin/datasource" className='text-decoration-none text-black'>
//           <li className='sidebar-list-item'>
//             <IoIosLink className='icon' /> Data Sources
//             </li>
//           </Link>

//       </ul>
//     </aside>
//   );
// }

// export default Sidebar;



import React from 'react';
import { Link } from 'react-router-dom';
import {
  BsGrid1X2Fill,
  BsFillGrid3X3GapFill,
  BsListCheck
} from 'react-icons/bs';
import { GrDocumentText } from "react-icons/gr";
import { MdGroups } from "react-icons/md";
import { IoIosLink } from "react-icons/io";
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

function Sidebar({ openSidebarToggle, OpenSidebar }) {
  return (
    <aside id="sidebar" className={openSidebarToggle ? "sidebar-responsive" : ""}>
      <div className='sidebar-title'>
        <div className='sidebar-brand'>
          <img src='../src/assets/img/llm.webp' className='icon_header' alt="Logo" /> Govind
        </div>
        <span className='icon close_icon bg-primary' onClick={OpenSidebar} style={{ cursor: 'pointer' }}>
          {openSidebarToggle ? <FaChevronRight /> : <FaChevronLeft />}
        </span>
      </div>

      <ul className='sidebar-list'>
        <Link to="/admin/" className='text-decoration-none text-black'>
          <li className='sidebar-list-item'>
            <BsGrid1X2Fill className='icon' /> Dashboard
          </li>
        </Link>
        
        <Link to="/admin/AdminAcc" className='text-decoration-none text-black'>
          <li className='sidebar-list-item'>
            <BsFillGrid3X3GapFill className='icon' /> Accounts
          </li>
        </Link>
        
        <Link to="/admin/AdminDoc" className='text-decoration-none text-black'>
          <li className='sidebar-list-item'>
            <GrDocumentText className='icon' /> Docs
          </li>
        </Link>
        
        <Link to="/admin/AdminGroups" className='text-decoration-none text-black'>
          <li className='sidebar-list-item'>
            <MdGroups className='icon' /> Groups
          </li>
        </Link>

        <Link to="/admin/datasource" className='text-decoration-none text-black'>
          <li className='sidebar-list-item'>
            <IoIosLink className='icon' /> Data Sources
          </li>
        </Link>
      </ul>
    </aside>
  );
}

export default Sidebar;
