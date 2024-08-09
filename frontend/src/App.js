import { useState } from 'react'
import './App.css'
import Header from './components/layoutComponents/Header'
import Sidebar from './components/layoutComponents/Sidebar'
import 'bootstrap/dist/css/bootstrap.min.css'
import Content from './components/layoutComponents/Content'

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
// import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import Login from './components/user/Login';
import Register from './components/user/Register';

import Profile from './components/user/Profile';
import ProtectedRoute from './components/route/ProtectedRoute';
import UpdateProfile from './components/user/UpdateProfile';
import UpdatePassword from './components/user/UpdatePassword';
import ForgotPassword from './components/user/ForgotPassword';
import ResetPassword from './components/user/ResetPassword';

// admin -----------------------------------------------
// import Dashboard from './components/admin/Dashboard';
import VideoDetail from './components/videos/VideoDetail';
import NewVideo from './components/admin/NewVideoFile';
import UpdateVideoFile from './components/admin/updateVideoFile';
import UserList from './components/admin/UserList';
import UpdateUser from './components/admin/UpdateUser';
import { useEffect } from 'react';
import store from './store';
import { loadUser } from './actions/userActions';


function App() {
  useEffect(()=>{
    store.dispatch(loadUser);
  })
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false)

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle)
  }

  return (
    <Router>
      <HelmetProvider>
        <div className='grid-container'>
          <Header OpenSidebar={OpenSidebar}/>
          <Sidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar}/>
            {/* <ToastContainer theme='dark' /> */}
            <Routes>
              <Route path='/' element={<Login/>} />
              <Route path='/videos/device/:device' element={<VideoDetail/>} />
              <Route path='/login' element={<Login/>} />
              <Route path='/register' element={<Register/>} />
              <Route path='/myprofile' element={<ProtectedRoute><Profile/></ProtectedRoute> } />
              <Route path='/myprofile/update' element={<ProtectedRoute><UpdateProfile/></ProtectedRoute> } />
              <Route path='/myprofile/update/password' element={<ProtectedRoute><UpdatePassword/></ProtectedRoute> } />
              <Route path='/password/forgot'   element={<ForgotPassword/> } />
              <Route path='/password/reset/:token' element={<ResetPassword/> } />
            </Routes>

            {/* Admin Routes */}
            <Routes>
              <Route path='/admin/dashboard' element={ <ProtectedRoute isAdmin={true}><Content/></ProtectedRoute> } />
              <Route path='/admin/video/create' element={ <ProtectedRoute isAdmin={true}><NewVideo/></ProtectedRoute> } />
              <Route path='/admin/video/update/:id' element={<ProtectedRoute isAdmin={true}><UpdateVideoFile/></ProtectedRoute>} />
              <Route path='/admin/users' element={ <ProtectedRoute isAdmin={true}><UserList/></ProtectedRoute> } />
              <Route path='/admin/user/:id' element={ <ProtectedRoute isAdmin={true}><UpdateUser/></ProtectedRoute> } />
            </Routes>
        </div>
      </HelmetProvider>
    </Router>   
  )
}

export default App
