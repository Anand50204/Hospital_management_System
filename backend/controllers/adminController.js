
import doctorModel from "../models/doctorModel.js";
import jwt from "jsonwebtoken";
import appointmentModel from "../models/appointmentModel.js";
import userModel from "../models/userModel.js";

// api adding doctore

const addDoctor = async (req, res) => {
    try {
        const { name, email, password, speciality, degree, experience, about, fees, address, image } = req.body;

        if (!name || !email || !password || !speciality || !degree || !experience || !about || !fees || !address) {
            return res.json({ success: false, message: "Missing Details" })
        }
        if (password.length < 8) {
            return res.json({ success: false, message: "Enter strong password" })
        }

        const doctorData = {
            name,
            email,
            image,
            password,
            speciality,
            degree,
            experience,
            about,
            fees,
            address: JSON.parse(address),
            date: Date.now()
        }

        const newDoctore = new doctorModel(doctorData);
        await newDoctore.save();
        res.json({ success: true, message: "Doctore Added" })

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }
}


//API for admin Login

const loginAdmin = (req, res) => {

    try {
        const { email, password } = req.body;

        if (email == process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
            const token = jwt.sign(email + password, process.env.JWT_SECRET)
            res.json({ success: true, token })
        } else {
            res.json({ success: false, message: "Invalid crenditials" })
        }

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }
}

// Api to all doctore list for admin panel

const AllDoctors = async (req, res) => {
    try {

        const doctors = await doctorModel.find({});
        res.json({ success: true, doctors })

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: message.error })

    }
}

// API to get all Appointment list

const appointmentsAdmin = async (req, res) => {
    try {

        const appointments = await appointmentModel.find({});

        res.json({ success: true, appointments })

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: message.error })

    }
}

// API for appointment cancelled

const AppointmentCancel = async (req, res) => {
    try {

        const { appointmentId } = req.body;

        const appointmentData = await appointmentModel.findById(appointmentId);

        await appointmentModel.findByIdAndUpdate(appointmentId, { cancelled: true });

        // releasing doctore sloteTime

        const { docId, slotDate, slotTime } = appointmentData;

        const doctorData = await doctorModel.findById(docId)

        let slots_booked = doctorData.slots_booked

        slots_booked[slotDate] = slots_booked[slotDate].filter(e => e != slotTime)

        await doctorModel.findByIdAndUpdate(docId, { slots_booked })

        res.json({ success: true, message: "Appointment Cancelled" })

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }
}

// Api to get dashboard dat for admin pannel

const adminDashBoard = async (req, res) => {
    try {
        const doctors = await doctorModel.find({});
        const users = await userModel.find({});
        const appointments = await appointmentModel.find({});

        const dashData = {
            doctors: doctors.length,
            appointments: appointments.length,
            users: users.length,
            latestAppointments: appointments.reverse().slice(0, 5)
        }
        res.json({ success: true, dashData })

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }
}
export { addDoctor, loginAdmin, AllDoctors, appointmentsAdmin, AppointmentCancel, adminDashBoard }