import axios from 'axios';
import React, { useContext, useState } from 'react'
import { AppContext } from '../context/AppContext';
import { toast } from 'react-toastify';

const Formate = () => {

    const { email, backendUrl, setState, navigate } = useContext(AppContext);

    const [newPassword, setNewPassword] = useState("");
    const [ConfirmNewPassword, setConfirmNewPassword] = useState("");

    const changePassword = async () => {

        try {
            const isMatech = newPassword == ConfirmNewPassword

            if (isMatech) {

                const { data } = await axios.post(backendUrl + '/api/user/reset-passwod', { email, newPassword })
                if (data.success) {
                    toast.success(data.message)
                    setState("login")
                    navigate('/login')
                } else {
                    toast.error(data.message)
                }
            }else{
                alert("Confirm not match")
            }
        } catch (error) {
            console.log(error);
            toast.error(error.massage)
        }
    }

    return (
        <div className=' min-h-[80vh] flex items-center'>
            <div className=' flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 rounded-xl text-zinc-600 text-sm shadow-lg'>
                <p className=' text-2xl font-semibold'>Create New Password</p>

                <div className=' w-full'>
                    <p>New Password</p>
                    <input className=' border border-zinc-300 rounded w-full p-2 mt-1' type="password" onChange={(e) => setNewPassword(e.target.value)} value={newPassword} />
                </div>
                <div className=' w-full'>
                    <p>Confirm New Password</p>
                    <input className=' border border-zinc-300 rounded w-full p-2 mt-1' type="password" onChange={(e) => setConfirmNewPassword(e.target.value)} value={ConfirmNewPassword} />
                </div>
                <div className=' w-full'>
                    <button onClick={()=>navigate('/login')} className=' border border-primary text-primary  px-3 py-1.5 m-1 rounded-md text-base '>Cancel</button>
                    <button onClick={changePassword} className=' bg-primary text-white m-1 px-4 py-2 rounded-md text-base '>Save</button>
                </div>

            </div>

        </div>
    )
}

export default Formate
