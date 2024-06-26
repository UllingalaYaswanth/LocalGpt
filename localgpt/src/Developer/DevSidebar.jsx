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

function Sidebar({ openSidebarToggle, OpenSidebar }) {
  return (
    <aside id="sidebar" className={openSidebarToggle ? "sidebar-responsive" : ""}>
      <div className='sidebar-title'>
        <div className='sidebar-brand'>
          <img src='../src/assets/img/llm.webp' className='icon_header' alt="Logo" /> Govind
        </div>
        <span className='icon close_icon bg-primary' onClick={OpenSidebar}>X</span>
      </div>

      <ul className='sidebar-list'>
        <li className='sidebar-list-item'>
          <Link to="/developer/">
            <BsGrid1X2Fill className='icon' />Console
          </Link>
        </li>
        <li className='sidebar-list-item'>
          <Link to="/developer/DevUpload">
            <IoCloudUploadSharp className='icon' /> Upload
          </Link>
        </li>
        <li className='sidebar-list-item'>
          <Link to="/developer/DevManage">
            <GrDocumentText className='icon' /> Manage
          </Link>
        </li>
        <li className='sidebar-list-item'>
          <Link to="/developer/">
            <MdGroups className='icon' /> Train
          </Link>
        </li>
      </ul>
    </aside>
  );
}

export default Sidebar;
