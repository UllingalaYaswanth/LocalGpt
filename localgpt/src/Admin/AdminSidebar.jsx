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
          <Link to="/">
            <BsGrid1X2Fill className='icon' /> Dashboard
          </Link>
        </li>
        <li className='sidebar-list-item'>
          <Link to="/accounts">
            <BsFillGrid3X3GapFill className='icon' /> Accounts
          </Link>
        </li>
        <li className='sidebar-list-item'>
          <Link to="/docs">
            <GrDocumentText className='icon' /> Docs
          </Link>
        </li>
        <li className='sidebar-list-item'>
          <Link to="/groups">
            <MdGroups className='icon' /> Groups
          </Link>
        </li>
        <li className='sidebar-list-item'>
          <Link to="/datasource">
            <IoIosLink className='icon' /> Data Sources
          </Link>
        </li>
        <li className='sidebar-list-item'>
          <Link to="/flags">
            <BsListCheck className='icon' /> Flags
          </Link>
        </li>
      </ul>
    </aside>
  );
}

export default Sidebar;
