import React from 'react'
import 
 {BsJustify}
 from 'react-icons/bs'
import Search from './Search'
import Profile from './Profile'


function Header({OpenSidebar}) {
  return (
    <header className='header'>
     
        <div className='menu-icon'>
            <BsJustify className='icon' onClick={OpenSidebar}/>
        </div>
        <div className='header-left'>
         <Search/>
        </div>
        <div className='header-right'>
           <Profile/>
        </div>
    </header>
  )
}

export default Header