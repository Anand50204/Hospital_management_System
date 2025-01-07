import React, { useContext } from 'react'
import Login from './pages/Login'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import { AdminContext } from './context/AdminContext';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import { Route, Routes } from 'react-router-dom';
import Dashboard from './pages/Admin/Dashboard';
import AllApointment from './pages/Admin/AllApointment';
import AddDoctore from './pages/Admin/AddDoctore';
import  DoctoreList  from "./pages/Admin/DoctoreList";
import { DoctorContext } from './context/DoctoreContext';
import DoctoreDashBoard from './pages/Doctore/DoctoreDashBoard';
import DoctoreAppointment from './pages/Doctore/DoctoreAppointment';
import DoctoreProfile from './pages/Doctore/DoctoreProfile';

const App = () => {

  const {dToken} = useContext(DoctorContext);
  const {aToken} = useContext(AdminContext);

  return aToken || dToken ? ( 
    <div className=' bg-[#f8f9fd]'>
      <ToastContainer />
      <Navbar/>
      <div className=' flex items-start'>
        <Sidebar/>
        <Routes>
          {/* Admin route */}
          <Route path='/' element={<></>} />
          <Route path='/admin-dashboard' element={<Dashboard></Dashboard>} />
          <Route path='/allapointment' element={<AllApointment></AllApointment>} />
          <Route path='/add-doctor' element={<AddDoctore></AddDoctore>} />
          <Route path='/doctor-list' element={<DoctoreList></DoctoreList>} />
          {/* doctor Route */}
          <Route path='/doctor-dashboard' element={<DoctoreDashBoard/>}/>
          <Route path='/doctor-appointment' element={<DoctoreAppointment/>} />
          <Route path='/doctor-profile' element={<DoctoreProfile/>} />
        </Routes>
      </div>
    </div>
  )
    : (
      <>
      <Login />
      <ToastContainer />
    </>
    )
}

export default App
