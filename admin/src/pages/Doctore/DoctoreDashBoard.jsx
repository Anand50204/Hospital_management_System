import React, { useContext, useEffect } from 'react'
import { DoctorContext } from '../../context/DoctoreContext'
import { assets } from "../../assets/assets";
import { AppContext } from '../../context/AppContext';

const DoctoreDashBoard = () => {

  const { dashData, getDashData, dToken, completAppointment, backendUrl, cancelAppointment } = useContext(DoctorContext);
  const { currency } = useContext(AppContext);

  useEffect(() => {
    if (dToken)
      getDashData()
  }, [dToken])

  return dashData && (
    <div>
      <div className=' flex flex-wrap gap-3 ml-10 mt-5'>
        <div className=' flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all'>
          <img className=' w-14' src={assets.earning_icon} alt="" />
          <div>
            <p className=' text-xl font-semibold text-gray-600'>{currency}{dashData.earning}</p>
            <p className=' text-gray-400'>Earning </p>
          </div>
        </div>

        <div className=' flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all'>
          <img className=' w-14' src={assets.appointments_icon} alt="" />
          <div>
            <p className=' text-xl font-semibold text-gray-600'>{dashData.appointments}</p>
            <p className=' text-gray-400'>Appointments</p>
          </div>
        </div>
      </div>

      <div className=' bg-white ml-10 '>

        <div className=' flex items-center gap-2.5 px-4 py-4 mt-10 rounded-t border'>
          <img src={assets.list_icon} alt="" />
          <p className=' font-semibold'>Latest Booking</p>
        </div>
        <div className=' pt-4 border border-t-0'>
          {
            dashData.latestAppointments.map((item, index) => (
              <div className=' flex items-center px-6 py-3 gap-3 hover:bg-gray-100' key={index}>
                <img className=' rounded-full w-10' src={backendUrl + '/images/' + item.docData.image} alt="" />
                <div className=' flex-1 text-sm'>
                  <p className=' text-gray-800 font-medium'>{item.docData.name}</p>
                  <p className=' text-gray-600'>{item.slotDate}</p>
                </div>
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

    </div>
  )
}

export default DoctoreDashBoard
