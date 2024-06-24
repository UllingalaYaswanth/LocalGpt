import React from 'react'
import 
{BsCart3, BsGrid1X2Fill, BsFillArchiveFill, BsFillGrid3X3GapFill, BsPeopleFill, 
  BsListCheck, BsMenuButtonWideFill, BsFillGearFill}
 from 'react-icons/bs'
 import { GrDocumentText } from "react-icons/gr";
 import { MdGroups } from "react-icons/md";
 import { IoIosLink } from "react-icons/io";

function Sidebar({openSidebarToggle, OpenSidebar}) {
  return (
    <aside id="sidebar" className={openSidebarToggle ? "sidebar-responsive": ""}>
        <div className='sidebar-title'>
            <div className='sidebar-brand'>
                <img src='./src/img/llm.webp'  className='icon_header'/> Govind
            </div>
            <span className='icon close_icon' onClick={OpenSidebar}>X</span>
        </div>

        <ul className='sidebar-list'>
            <li className='sidebar-list-item'>
                <a href="">
                    <BsGrid1X2Fill className='icon'/> Dashboard
                </a>
            </li>
            <li className='sidebar-list-item'>
                <a href="">
                    <BsFillGrid3X3GapFill className='icon'/> Accounts
                </a>
            </li>
            <li className='sidebar-list-item'>
                <a href="">
                    <GrDocumentText className='icon'/> Docs
                </a>
            </li>
            <li className='sidebar-list-item'>
                <a href="">
                    <MdGroups className='icon'/> Groups
                </a>
            </li>
            <li className='sidebar-list-item'>
                <a href="">
                    <IoIosLink className='icon'/> Urls
                </a>
            </li>
            <li className='sidebar-list-item'>
                <a href="">
                    <BsListCheck className='icon'/> Flags
                </a>
            </li>
            
        </ul>
    </aside>
  )
}

export default Sidebar