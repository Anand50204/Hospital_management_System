import React, { useContext } from 'react'
import { AppContext } from '../context/AppContext';

const TopDoctores = () => {

    const { doctors,navigate } = useContext(AppContext);
   

    return (
        <div className=' flex flex-col items-center gap-4 my-16 text-gray-900 md:mx-10 mt-2'>
            <h1 className=' text-3xl font-medium'>Top Doctores to Book</h1>
            <p className=' w-1/2 text-center text-sm'>Simpal Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
            <div className=' w-full grid grid-cols-auto gap-4 pt-5 gap-y-6 px-3 sm:px-0'>
                {doctors == 0
                    ? <div class="flex space-x-2 justify-center">
                        <div class="w-4 h-4 bg-primary rounded-full animate-bounce"></div>
                        <div class="w-4 h-4 bg-primary rounded-full animate-bounce delay-150"></div>
                        <div class="w-4 h-4 bg-primary rounded-full animate-bounce delay-300"></div>
                    </div>

                    : doctors.slice(0, 10).map((item, index) => (
                        <div onClick={() => { navigate(`/appointment/${item._id}`); scrollTo(0, 0) }} className=' border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500' key={index}>
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
                    ))}
            </div>
            <button onClick={() => { navigate('/doctors'); scrollTo(0, 0) }} className=' bg-blue-50 text-sm text-gray-600 px-12 py-3 rounded-full mt-8'>more</button>
        </div>
    )
}

export default TopDoctores
