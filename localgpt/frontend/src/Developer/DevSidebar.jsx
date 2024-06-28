import React from 'react';
import { Link } from 'react-router-dom';
import {
  BsGrid1X2Fill,
  BsFillGrid3X3GapFill,
  BsListCheck
} from 'react-icons/bs';
import { GrDocumentText } from "react-icons/gr";
import { MdGroups } from "react-icons/md";
import { IoCloudUploadSharp } from "react-icons/io5";
import 'bootstrap/dist/css/bootstrap.min.css'

function Sidebar({ openSidebarToggle, OpenSidebar, handleLogout }) {
  return (
    <aside id="sidebar" className={openSidebarToggle ? "sidebar-responsive" : ""}>
      <div className='sidebar-title'>
        <div className='sidebar-brand'>
          <img src='../src/assets/img/llm.webp' className='icon_header' alt="Logo" /> Govind
        </div>
        <span className='icon close_icon bg-primary' onClick={OpenSidebar}>X</span>
      </div>

      <ul className='sidebar-list ms-2'>
        <Link to="/developer/" className='text-decoration-none text-black'> 
          <li className='sidebar-list-item'>
            <BsGrid1X2Fill className='icon' />
            <span>Console</span>
          </li>
        </Link>
        <Link to="/developer/DevUpload" className='text-decoration-none text-black'>
          <li className='sidebar-list-item'>
            <IoCloudUploadSharp className='icon' />
            <span>Upload</span>
          </li>
        </Link>
        <Link to="/developer/DevManage" className='text-decoration-none text-black'>
          <li className='sidebar-list-item'>
            <GrDocumentText className='icon' />
            <span>Manage</span>
          </li>
        </Link>
      </ul>
    </aside>
  );
}

export default Sidebar;
