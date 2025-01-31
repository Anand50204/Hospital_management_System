import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext';
import { useParams } from 'react-router-dom';

const Doctors = () => {

  const { doctors, navigate } = useContext(AppContext);
  const { speciality } = useParams();

  const [filterDoc, setFilterDoc] = useState([]);
  const [ShowFilte, setShowFilte] = useState(false)
  
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
        <button className={`py-1 px-3 border rounded text-sm transition-all sm:hidden ${ShowFilte ? 'bg-primary text-white' : ''}`} onClick={() => setShowFilte(prev => !prev)}>Filters</button>
        <div className={`flex flex-col gap-4 text-sm text-gray-600 ${ShowFilte ? 'flex' : 'hidden sm:flex'}`}>
          <p onClick={() => speciality === "General physician" ? navigate('/doctors') : navigate('/doctors/General physician')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border ${speciality === "General physician" ? "bg-indigo-100 text-black" : ""}`}>General physician</p>
          <p onClick={() => speciality === "Gynecologist" ? navigate('/doctors') : navigate('/doctors/Gynecologist')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border ${speciality === "Gynecologist" ? "bg-indigo-100 text-black" : ""}`}>Gynecologist</p>
          <p onClick={() => speciality === "Dermatologist" ? navigate('/doctors') : navigate('/doctors/Dermatologist')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border ${speciality === "Dermatologist" ? "bg-indigo-100 text-black" : ""}`}>Dermatologist</p>
          <p onClick={() => speciality === "Pediatricians" ? navigate('/doctors') : navigate('/doctors/Pediatricians')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border ${speciality === "Pediatricians" ? "bg-indigo-100 text-black" : ""}`}>Pediatricians</p>
          <p onClick={() => speciality === "Neurologist" ? navigate('/doctors') : navigate('/doctors/Neurologist')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border ${speciality === "Neurologist" ? "bg-indigo-100 text-black" : ""}`}>Neurologist</p>
          <p onClick={() => speciality === "Gastroenterologist" ? navigate('/doctors') : navigate('/doctors/Gastroenterologist')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border ${speciality === "Gastroenterologist" ? "bg-indigo-100 text-black" : ""}`}>Gastroenterologist</p>
        </div>
        <div className=' w-full grid grid-cols-auto gap-5 gap-y-6'>
          {filterDoc == 0
            ? <div className="flex space-x-2 justify-center">
              <div className="w-4 h-4 bg-primary rounded-full animate-bounce"></div>
              <div className="w-4 h-4 bg-primary rounded-full animate-bounce delay-150"></div>
              <div className="w-4 h-4 bg-primary rounded-full animate-bounce delay-300"></div>
            </div>

            : filterDoc.map((item, index) => (
              <div onClick={() => navigate(`/appointment/${item._id}`)} className=' border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500' key={index}>
                <img className=' bg-blue-50' src={item.image} alt="" />
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
