import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext'
import { useNavigate } from 'react-router-dom';

const RelatedDoctors = ({docId,speciality}) => {

const {doctors} = useContext(AppContext);
const Navigate = useNavigate();

const [relDocs,setRelDocs] = useState([]);

useEffect(()=>{
    if(doctors.length > 0 && speciality){
        const doctorsData = doctors.filter((doc)=> doc.speciality === speciality && doc._id !== docId);
        setRelDocs(doctorsData);
    }
},[docId,doctors,speciality])

  return (
    <div className=' flex flex-col items-center gap-4 my-16 text-gray-900 md:mx-10 mt-2'>
            <h1 className=' text-3xl font-medium'>Top Doctores to Book</h1>
            <p className=' w-1/2 text-center text-sm'>Simpal Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
            <div className=' w-full grid grid-cols-auto gap-4 pt-5 gap-y-6 px-3 sm:px-0'>
                {relDocs.slice(0, 5).map((item, index) => (
                    <div className=' border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500' key={index}>
                        <img onClick={()=>{Navigate(`/appointment/${item._id}`); scrollTo(0,0)}} className=' bg-blue-50' src={item.image} alt="" />
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
                ))}
            </div>
            <button onClick={()=>{ Navigate('/doctors'); scrollTo(0,0)}} className=' bg-blue-50 text-sm text-gray-600 px-12 py-3 rounded-full mt-8'>more</button>
        </div>
  )
}

export default RelatedDoctors
