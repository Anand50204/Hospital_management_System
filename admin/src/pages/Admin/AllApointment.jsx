import React, { useContext, useEffect } from 'react'
import { AdminContext } from '../../context/AdminContext'
import { AppContext } from '../../context/AppContext';
import { assets } from "../../assets/assets";

const AllApointment = () => {

  const { aToken, appointments, getAllAppointments, cancelAppointment } = useContext(AdminContext);
  const { calculateAge, currency } = useContext(AppContext);

  useEffect(() => {
    if (aToken) {
      getAllAppointments();
    }

  }, [aToken])
  return (
    <div className=' w-full max-w-6xl m-5'>
      <p className=' mb-3 text-lg font-medium'>App Appointments</p>

      <div className=' bg-white border rounded text-sm max-h-[80vh] min-h-[60vh] overflow-y-scroll '>
        <div className=' hidden sm:grid grid-cols-[.5fr_3fr_1fr_3fr_3fr_1fr_1fr] grid-flow-col py-3 px-6 border-b'>
          <p>#</p>
          <p>Patient</p>
          <p>Age</p>
          <p>Date & Time</p>
          <p>Doctore</p>
          <p>Fees</p>
          <p>Actions</p>
        </div>
        {appointments == 0
          ? <div className="flex space-x-2 justify-center mt-5">
            <div className="w-4 h-4 bg-primary rounded-full animate-bounce"></div>
            <div className="w-4 h-4 bg-primary rounded-full animate-bounce delay-150"></div>
            <div className="w-4 h-4 bg-primary rounded-full animate-bounce delay-300"></div>
          </div>

          : appointments.map((item, index) => (
            <div className=' flex flex-wrap justify-between max-sm:gap-2 sm:grid sm:grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] items-center text-gray-500 py-3 px-6 border-b hover: bg-gray-50' key={index}>
              <p className=' max-sm:hidden'>{index + 1}</p>
              <p>{item.userData.name}</p>
              <p className=' max-sm:hidden'>{calculateAge(item.userData.dob)}</p>
              <p>{item.slotDate} & {item.slotTime}</p>
              <div className=' flex items-center gap-2'>
                <img className=' w-8 rounded-full bg-gray-200' src={item.docData.image} alt="" /> <p>{item.docData.name}</p>
              </div>
              <p>{currency}{item.amount}</p>
              {
                item.cancelled
                  ? <p className=' text-red-400 text-xs font-medium '>Cancelled</p>
                  : item.isCompleted
                    ? <p className=' text-green-500 text-xs font-medium'>Completed</p>
                    : <div className=' flex'>
                      <img onClick={() => cancelAppointment(item._id)} className=' w-10 cursor-pointer' src={assets.cancel_icon} alt="" />
                    </div>
              }

            </div>
          ))
        }
      </div>

    </div>
  )
}

export default AllApointment
