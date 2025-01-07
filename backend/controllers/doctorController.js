
import appointmentModel from "../models/appointmentModel.js";
import doctorModel from "../models/doctorModel.js";
import jwt from "jsonwebtoken";

const changeAvailablity = async (req, res) => {
    try {
        const { docId } = req.body;

        const docData = await doctorModel.findById(docId);
        await doctorModel.findByIdAndUpdate(docId, { available: !docData.available })
        res.json({ success: true, message: "abailablity change" })

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }
}

const doctorList = async (req, res) => {
    try {

        const doctors = await doctorModel.find({});
        res.json({ success: true, doctors });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }
}
/// Api for doctor Login

const loginDoctore = async (req, res) => {
    try {

        const { email, password } = req.body;

        const doctor = await doctorModel.findOne({ email })

        if (!doctor) {
            return res.json({ success: false, message: "Invalid credentials" })
        }

        const isMatch = password == doctor.password;
        if (isMatch) {
            const token = jwt.sign({ id: doctor._id }, process.env.JWT_SECRET)
            res.json({ success: true, token })
        } else {
            res.json({ success: false, message: "Invalid password" })
        }

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }
}

// Api to get doctore appointment for doctore pannel

const appointmentDoctor = async (req, res) => {

    try {

        const { docId } = req.body;

        const appointments = await appointmentModel.find({docId})

        res.json({ success: true, appointments });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }
}

// API t mark appointment completetd for doctotr panel

const appointmemtComplet = async (req, res) => {

    try {

        const { appointmentId } = req.body;


        await appointmentModel.findByIdAndUpdate(appointmentId, { isCompleted: true })

        return res.json({ success: true, message: "Appointment Completed" })

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })

    }
}

// API to cancel appointment for doctotr panel

const appointmemtCancel = async (req, res) => {

    try {

        const { docId, appointmentId } = req.body;

        const appointmentData = await appointmentModel.findById(appointmentId);

        await appointmentModel.findByIdAndUpdate(appointmentId, { cancelled: true })

        return res.json({ success: true, message: "Appointment Canceld" })

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })

    }
}

/// api to get dashboard data for doctore panel

const doctoreDashboard = async (req, res) => {

    try {

        const { docId } = req.body;

        const appointments = await appointmentModel.find({ docId })

        let earning = 0;

        appointments.map((item) => {
            if (item.isCompleted) {
                earning += item.amount
            }
        })

        let patients = []

        appointments.map((item) => {
            if (!patients.includes(item.userId)) {
                patients.push(item.userId)
            }
        })

        const dashData = {
            earning,
            appointments: appointments.length,
            patients: patients.length,
            latestAppointments: appointments.reverse().slice(0, 5)
        }

        res.json({ success: true, dashData })

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }
}

/// Api to get doctor profile to doctor panel
 
const doctorProfile = async (req, res) => {
    try {

        const { docId } = req.body

        const profileData = await doctorModel.findById(docId)
        
        res.json({ success: true, profileData })

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }
}

///api to Update to doctore profile data to doctore panel

const updatDoctorProfile = async (req, res) => {
    try {

        const { docId, fees, address, available } = req.body;

        await doctorModel.findByIdAndUpdate(docId, { fees, address, available })

        res.json({ success: true, message: "Profile Updated" })

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }

}

export {
    changeAvailablity,
    doctorList,
    loginDoctore,
    appointmentDoctor,
    appointmemtComplet,
    appointmemtCancel,
    doctoreDashboard,
    doctorProfile,
    updatDoctorProfile
}