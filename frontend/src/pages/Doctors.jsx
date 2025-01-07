import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AppContext } from '../context/AppContext';

const Doctors = () => {

  const [filterDoc, setFilterDoc] = useState([]);
  const [ShowFilte,setShowFilte] = useState(false)
  const { speciality } = useParams();
  const { doctors } = useContext(AppContext);
  const Navigate = useNavigate();

  const ApplyFilterd = () => {

    if (speciality) {
      setFilterDoc(doctors.filter(doc => doc.speciality === speciality))
    } else {
      setFilterDoc(doctors);
    }
  }
  useEffect(() => {
    ApplyFilterd();
  }, [doctors, speciality])

  return (
    <div>
      <p className=' text-gray-600 '>Browse through the doctors specialist. </p>
      <div className=' flex flex-col sm:flex-row items-start gap-5 mt-5'>
        <button className={`py-1 px-3 border rounded text-sm transition-all sm:hidden ${ShowFilte ? 'bg-primary text-white' : ''}`} onClick={()=>setShowFilte(prev => !prev)}>Filters</button>
        <div className={`flex flex-col gap-4 text-sm text-gray-600 ${ShowFilte ? 'flex': 'hidden sm:flex'}`}>
          <p onClick={()=>speciality === "General physician" ? Navigate('/doctors') :Navigate('/doctors/General physician')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border ${speciality === "General physician" ? "bg-indigo-100 text-black" :""}`}>General physician</p>
          <p onClick={()=>speciality === "Gynecologist" ? Navigate('/doctors') :Navigate('/doctors/Gynecologist')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border ${speciality === "Gynecologist" ? "bg-indigo-100 text-black" :""}`}>Gynecologist</p>
          <p onClick={()=>speciality === "Dermatologist" ? Navigate('/doctors') :Navigate('/doctors/Dermatologist')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border ${speciality === "Dermatologist" ? "bg-indigo-100 text-black" :""}`}>Dermatologist</p>
          <p onClick={()=>speciality === "Pediatricians" ? Navigate('/doctors') :Navigate('/doctors/Pediatricians')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border ${speciality === "Pediatricians" ? "bg-indigo-100 text-black" :""}`}>Pediatricians</p>
          <p onClick={()=>speciality === "Neurologist" ? Navigate('/doctors') :Navigate('/doctors/Neurologist')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border ${speciality === "Neurologist" ? "bg-indigo-100 text-black" :""}`}>Neurologist</p>
          <p onClick={()=>speciality === "Gastroenterologist" ? Navigate('/doctors') :Navigate('/doctors/Gastroenterologist')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border ${speciality === "Gastroenterologist" ? "bg-indigo-100 text-black" :""}`}>Gastroenterologist</p>
        </div>
        <div className=' w-full grid grid-cols-auto gap-5 gap-y-6'>
          {
            filterDoc.map((item, index) => (
              <div className=' border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500' key={index}>
                <img onClick={() => Navigate(`/appointment/${item._id}`)} className=' bg-blue-50' src={item.image} alt="" />
                <div className=' p-4'>
                  {
                       item.available
                       ? <div className=' flex items-center gap-2 text-sm text-center text-green-500'>
                         <p className=' w-2 h-2 bg-green-500 rounded-full'> </p><p>Available</p>
                          </div>
                          : <div className=' flex items-center gap-2 text-sm text-center text-red-400'>
                               <p className=' w-2 h-2 bg-red-400 rounded-full'> </p><p>Not Available</p>
                           </div>
                     }
                  <p className=' text-gray-900 text-lg font-medium'>{item.name}</p>
                  <p className=' text-gray-600 text-sm'>{item.speciality}</p>
                </div>
              </div>
            ))
          }
        </div>
      </div>

    </div>
  )
}

export default Doctors
