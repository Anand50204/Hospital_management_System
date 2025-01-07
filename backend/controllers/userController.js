
import appointmentModel from "../models/appointmentModel.js";
import doctorModel from "../models/doctorModel.js";
import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";


// api to register user
const registerUser = async (req, res) => {

    try {

        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.json({ success: false, message: 'Missing details' })
        }
        if (password.length < 6) {
            return res.json({ success: false, message: 'Enter strong Password' })
        }

        const userData = {
            name,
            email,
            password
        }

        const newUser = new userModel(userData);
        const user = await newUser.save();

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

        res.json({ success: true, token })

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }
}

// api for user Login
const userLogin = async (req, res) => {

    try {

        const { email, password } = req.body;

        const user = await userModel.findOne({ email });

        if (!user) {
            return res.json({ success: false, message: 'User dose not Exist' })
        }

        const isMatch = password == user.password
        if (isMatch) {
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)
            res.json({ success: true, token })
        } else {
            res.json({ success: false, message: "Invalid credentials" })
        }

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }
}

//API to get user profile dat

const getProfile = async (req, res) => {

    try {

        const { userId } = req.body;
        const userData = await userModel.findById(userId);
        res.json({ success: true, userData });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }
}

// API to update user profile

const UpdatProfile = async (req, res) => {
    try {

        const { userId, name, phone, address,dob, gender } = req.body;
        // const imageFile = req.body;

        // if (!name || !phone || !gender) {
        //     return res.json({ success: false, message: "data Missing" })
        // }
        await userModel.findByIdAndUpdate(userId, { name, phone, address, dob, gender });

        // if(imageFile){
        //     const imageUrl = imageFile.djfkdfkjg()
        //     await userModel.findByIdAndUpdate(userId,{image:imageUrl})
        // }

        res.json({ success: true, message: "Profile Updated" })

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }
}

// API to book appointment 
const bookAppointment = async (req, res) => {

    try {

        const { userId, docId, slotDate, slotTime } = req.body;

        const docData = await doctorModel.findById(docId).select('-password')
        if (!docData.available) {
            res.json({ success: false, message: "doctore not available" })
        }
        let slots_booked = docData.slots_booked;

        if (slots_booked[slotDate]) {
            if (slots_booked[slotDate].includes(slotTime)) {
                res.json({ success: false, message: "doctore not available" })
            } else {
                slots_booked[slotDate].push(slotTime);
            }
        } else {
            slots_booked[slotDate] = [];
            slots_booked[slotDate].push(slotTime);
        }

        const userData = await userModel.findById(userId).select('-password')

        delete docData.slots_booked;

        const appointmentData = {
            userId,
            docId,
            userData,
            docData,
            amount: docData.fees,
            slotTime,
            slotDate,
            date: Date.now()
        }

        const newAppointment = new appointmentModel(appointmentData);
        await newAppointment.save();

        // save  new slote data in docData

        await doctorModel.findByIdAndUpdate(docId, { slots_booked })

        res.json({ success: true, message: "Appointment Booked" })

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }
}

// API to get user appointment for frontend my-appointment page

const listAppointment = async (req, res) => {
    try {
        const { userId } = req.body;
        const appointments = await appointmentModel.find({ userId });
        res.json({ success: true, appointments });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }
}

// API to cancel appointment 

const cancelAppointment = async (req, res) => {
    try {

        const { userId, appointmentId } = req.body;

        const appointmentData = await appointmentModel.findById(appointmentId);

        if (appointmentData.userId !== userId) {
            return res.json({ success: false, message: "Unauthorized action" })
        }

        await appointmentModel.findByIdAndUpdate(appointmentId, { cancelled: true });

        // releasing doctore sloteTime

        const { docId, slotDate, slotTime } = appointmentData;

        const doctorData = await doctorModel.findById( docId )

        let slots_booked = doctorData.slots_booked

        slots_booked[slotDate] = slots_booked[slotDate].filter(e => e != slotTime)

        await doctorModel.findByIdAndUpdate(docId, { slots_booked })

        res.json({ success: true, message: "Appointment Cancelled" })

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }
}

// Api to make payment of appointment using razorepay

// const razorPayInstance = new razorpay({
//     key_id:"",
//     kew_secret:""
// })
// const paymentRazorPay = async (req,res)=>{

// }

export { registerUser, userLogin, getProfile, UpdatProfile, bookAppointment, listAppointment ,cancelAppointment}
