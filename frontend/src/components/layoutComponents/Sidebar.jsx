import React from 'react'
import { BsFiles , BsUpload  } from "react-icons/bs";
import ARR from '../../assets/images/ARR.png'
import { Link} from 'react-router-dom';



function Sidebar({openSidebarToggle, OpenSidebar}) {
  return (
    <aside id="sidebar" className={openSidebarToggle ? "sidebar-responsive": ""}>
        <div className='sidebar-title'>
            <div className='sidebar-brand'>
                <img src={ARR} className='ARR'/>
            </div>
            <span className='icon close_icon' onClick={OpenSidebar}>X</span>
        </div>
           
        <ul className='sidebar-list'>
            <li className='sidebar-list-item'>
                <Link to="/admin/dashboard"><BsFiles   className='icon'/> Dashboard </Link>             
            </li>
            <li className='sidebar-list-item'>
                <Link to="/videos/device/Vision Pro"><BsFiles   className='icon'/> Vision Pro </Link>                    
            </li>
            <li className='sidebar-list-item'>
                <Link to="/videos/device/Quest"><BsFiles   className='icon'/> Meta Quest </Link>                    
            </li>
            <li className='sidebar-list-item'>
                <Link to="/admin/video/create"><BsUpload  className='icon'/> upload Movies </Link> 
            </li>           
        </ul>
    </aside>
  )
}

export default Sidebar