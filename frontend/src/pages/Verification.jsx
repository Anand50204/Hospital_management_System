import React, { useContext, useState } from 'react'
import { AppContext } from '../context/AppContext';
import axios from "axios";

const Verification = () => {

    const { email, setEmail, verifiCode, setVerifiCode, token, backendUrl, navigate } = useContext(AppContext)

    const [otp, setOtp] = useState(new Array(6).fill(''));

    const resendOtp = async () => {

        const verify = await axios.post(backendUrl + '/api/user/veryfication', { email })

        if (verify.data.success) {
            setVerifiCode(verify.data.VeryficationCode);
            setOtp(new Array(6).fill(''))
        }
    }

    const Emailverificatin = () => {

        const isMatch = verifiCode == otp.join('');
        console.log(otp.join(""));

        if (isMatch) {
            if (token) {
                setEmail('')
                navigate('/')
            } else {
                navigate('/formate')
            }

        } else {
            alert("Enter valid OTP")
        }

    }

    const handelChange = (e, index) => {

        if (isNaN(e.target.value)) {
            return false;
        }

        setOtp([...otp.map((item, index1) => (index1 === index ? e.target.value : item))])

        if (e.target.value && e.target.nextSibling) {
            e.target.nextSibling.focus()
        }
    }

    return email
        ? (<div className=' min-h-[80vh] flex items-center'>
            <div className=' flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 rounded-xl text-zinc-600 text-sm shadow-lg'>
                <h3>{email} Verification Code Send</h3>
                <div className=' w-[70%] m-6 flex gap-3'>
                    {
                        otp.map((item, index) => {
                            return <input key={index} className=' w-10 p-2 outline-none border-2 rounded-sm font-semibold focus:border-gray-500 text-center'
                                type='text'
                                value={item}
                                maxLength={1}
                                onChange={(e) => handelChange(e, index)}
                            />
                        })
                    }
                </div>
                <div className=' w-full flex flex-row justify-between'>
                    <button onClick={resendOtp} className=' px-7 py-2 rounded-md text-base hover:text-primary contain-paint '>Resend</button>
                    <button onClick={Emailverificatin} className=' bg-primary text-white px-4 py-2 rounded-md text-base '>OTP verify</button>
                </div>
            </div>

        </div>
        )
        : navigate('/login')
}

export default Verification
