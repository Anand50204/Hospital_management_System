import React, { useContext } from 'react'
import { AdminContext } from '../context/AdminContext'
import { NavLink } from 'react-router-dom';
import { assets } from '../assets/assets';
import { DoctorContext } from '../context/DoctoreContext';

const Sidebar = () => {

    const { aToken } = useContext(AdminContext);
    const {dToken} = useContext(DoctorContext);

    return (
        <div className=' min-h-screen bg-white border-r'>
            {
                aToken && <ul className=' text-[#515151] mt-5'>
                    <NavLink className={({ isActive }) => `flex items-center gap-3 py-3.5 px-3 md:min-w-72 cursor-pointer ${isActive ? " bg-[#f2f3ff] border-r-4 border-primary" : ""}`}
                        to={'/admin-dashboard'}>
                        <img src={assets.home_icon} alt="" />
                        <p>Dashboard</p>
                    </NavLink>
                    <NavLink className={({ isActive }) => `flex items-center gap-3 py-3.5 px-3 md:min-w-72 cursor-pointer ${isActive ? " bg-[#f2f3ff] border-r-4 border-primary" : ""}`}
                        to={'/allapointment'}>
                        <img src={assets.appointment_icon} alt="" />
                        <p>Appointments</p>
                    </NavLink>
                    <NavLink className={({ isActive }) => `flex items-center gap-3 py-3.5 px-3 md:min-w-72 cursor-pointer ${isActive ? " bg-[#f2f3ff] border-r-4 border-primary" : ""}`}
                        to={'/add-doctor'}>
                        <img src={assets.add_icon} alt="" />
                        <p>Add Doctor</p>
                    </NavLink>
                    <NavLink className={({ isActive }) => `flex items-center gap-3 py-3.5 px-3 md:min-w-72 cursor-pointer ${isActive ? " bg-[#f2f3ff] border-r-4 border-primary" : ""}`}
                        to={'/doctor-list'}>
                        <img src={assets.people_icon} alt="" />
                        <p>Doctore List</p>
                    </NavLink>
                </ul>
            }

            {/* For Doctore  */}

            {
                dToken && <ul className=' text-[#515151] mt-5'>
                    <NavLink className={({ isActive }) => `flex items-center gap-3 py-3.5 px-3 md:min-w-72 cursor-pointer ${isActive ? " bg-[#f2f3ff] border-r-4 border-primary" : ""}`}
                        to={'/doctor-dashboard'}>
                        <img src={assets.home_icon} alt="" />
                        <p className=' hidden md:block'>Dashboard</p>
                    </NavLink>
                    <NavLink className={({ isActive }) => `flex items-center gap-3 py-3.5 px-3 md:min-w-72 cursor-pointer ${isActive ? " bg-[#f2f3ff] border-r-4 border-primary" : ""}`}
                        to={'/doctor-appointment'}>
                        <img src={assets.appointment_icon} alt="" />
                        <p className=' hidden md:block'>Appointments</p>
                    </NavLink>

                    <NavLink className={({ isActive }) => `flex items-center gap-3 py-3.5 px-3 md:min-w-72 cursor-pointer ${isActive ? " bg-[#f2f3ff] border-r-4 border-primary" : ""}`}
                        to={'/doctor-profile'}>
                        <img src={assets.people_icon} alt="" />
                        <p className=' hidden md:block'>Profile</p>
                    </NavLink>
                </ul>
            }

        </div>
    )
}

export default Sidebar