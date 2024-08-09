import { Link} from 'react-router-dom';
import { Image} from 'react-bootstrap';
import { BsFiles , BsUpload  } from "react-icons/bs";

export default function Sidebar ({openSidebarToggle, OpenSidebar}) {

    return (
        <>
            <aside id="sidebar" className={openSidebarToggle ? "sidebar-responsive": ""}>
                <div className='sidebar-title'>
                    <div className='sidebar-brand'>
                        {/* <figure > */}
                            <Image src='../../images/ARR.png' className='ARR'/>
                        {/* </figure> */}
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
        </>
    )
}