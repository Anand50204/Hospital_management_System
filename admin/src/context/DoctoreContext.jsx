import { createContext, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const DoctorContext = createContext();

const DoctorContextProvider = (props) => {

    const backendUrl = "https://backend-e35u.onrender.com";

    const [dToken, setDToken] = useState(localStorage.getItem('dToken') ? localStorage.getItem('dToken') : "");
    const [appointments, setAppointments] = useState([]);
    const [dashData, setDashData] = useState(false);
    const [profileData, setProfileData] = useState(false);

    const getAppointment = async () => {
        try {

            const { data } = await axios.get(backendUrl + '/api/doctor/appointment', { headers: { dToken } })
            if (data.success) {
                setAppointments(data.appointments)
                console.log(data.appointments);

            } else {
                toast.error(data.message)
            }

        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    }

    const completAppointment = async (appointmentId) => {
        try {

            const { data } = await axios.post(backendUrl + '/api/doctor/copmlete-appointment', { appointmentId }, { headers: { dToken } })
            if (data.success) {
                toast.success(data.message);
                getAppointment()
            } else {
                toast.error(data.message);
            }

        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    }

    const cancelAppointment = async (appointmentId) => {
        try {

            const { data } = await axios.post(backendUrl + '/api/doctor/cancel-appointment', { appointmentId }, { headers: { dToken } })
            if (data.success) {
                toast.success(data.message);
                getAppointment()
            } else {
                toast.error(data.message);
            }

        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    }

    const getDashData = async () => {

        try {

            const { data } = await axios.get(backendUrl + '/api/doctor/dashboard', { headers: { dToken } })

            if (data.success) {
                setDashData(data.dashData)

            } else {
                toast.error(data.message)
            }

        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    }

    const getProfileData = async () => {
        try {

            const { data } = await axios.get(backendUrl + '/api/doctor/profile', { headers: { dToken } })

            if (data.success) {
            setProfileData(data.profileData)
                console.log(data);
            } else {
                toast.error(data.message);
            }

        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    }

    const value = {
        backendUrl,
        dToken, setDToken,
        appointments, setAppointments, getAppointment,
        cancelAppointment, completAppointment,
        dashData, setDashData, getDashData,
        profileData, setProfileData, getProfileData,

    }

    return (
        <DoctorContext.Provider value={value}>
            {props.children}
        </DoctorContext.Provider>
    )
}

export default DoctorContextProvider
