import React, { useContext, useEffect } from 'react'
import { DoctorContext } from '../../context/DoctoreContext'
import { AppContext } from '../../context/AppContext';
import { assets } from '../../assets/assets';

const DoctoreAppointment = () => {

  const { dToken, appointments, cancelAppointment, completAppointment, getAppointment } = useContext(DoctorContext);
  const { calculateAge, currency } = useContext(AppContext);

  useEffect(() => {
    if (dToken) {
      getAppointment();
    }
  }, [dToken])
  return (
    <div className=' w-full max-w-6xl m-5'>
      <p className=' mb-3 text-lg font-medium'>All appointments</p>
      <div className=' bg-white border rounded text-sm max-h-[80vh] min-h-[50vh] overflow-y-scroll'>
        <div className='max-sm:hidden grid grid-cols-[0.5fr_2fr_1fr_1fr_3fr_1fr_1fr] gap-1 py-3 px-6 border-b' >
          <p>#</p>
          <p>Patient</p>
          <p>Payment</p>
          <p>Age</p>
          <p>Date & Time</p>
          <p>Fees</p>
          <p>Action</p>
        </div>

        {
          appointments.reverse().map((item, index) => (
            <div className=' flex flex-wrap justify-between max-sm:gap-5 max-sm:text-base sm:grid grid-cols-[0.5fr_2fr_1fr_1fr_3fr_1fr_1fr] gap-1 text-gray-500 py-3 px-6 border-b hover:bg-gray-50' key={index}>
              <p className=' max-sm:hidden'>{index + 1}</p>
              <p>{item.userData.name}</p>
              <p>{item.payment}nop</p>
              <p className=' max-sm:hidden'>{calculateAge(item.userData.dob)}</p>
              <p>{item.slotDate} & {item.slotTime}</p>
              <p>{currency}{item.amount}</p>
              {
                item.cancelled
                  ? <p className=' text-red-400 text-xs font-medium '>Cancelled</p>
                  : item.isCompleted
                    ? <p className=' text-green-500 text-xs font-medium'>Completed</p>
                    : <div className=' flex'>
                      <img onClick={() => cancelAppointment(item._id)} className=' w-10 cursor-pointer' src={assets.cancel_icon} alt="" />
                      <img onClick={() => completAppointment(item._id)} className=' w-10 cursor-pointer' src={assets.tick_icon} alt="" />
                    </div>
              }
            </div>
          ))
        }

      </div>
    </div>
  )
}

export default DoctoreAppointment
