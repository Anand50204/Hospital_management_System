
import appointmentModel from "../models/appointmentModel.js";
import doctorModel from "../models/doctorModel.js";
import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcryptjs from "bcryptjs";
import nodemailer from "nodemailer";

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
        const existUser = await userModel.findOne({ email })

        if (existUser) {
            return res.json({ success: false, message: "User Already exists Please Login" })
        }
        const hasePassword = await bcryptjs.hashSync(password, 10)

        const userData = {
            name,
            email,
            password: hasePassword,
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

// email veryfication 
const emailVeryfication = async (req, res) => {

    const { email } = req.body

    if (!email) {
        return res.json({ success: false, message: "Enter email" })
    }

    const VeryficationCode = Math.floor(100000 + Math.random() * 900000).toString()

    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // true for port 465, false for other ports
        auth: {
            user: "anandmaurya816@gmail.com",
            pass: "ocmo kseq lykh bqwq",
        },
    });

    const sendEmail = async () => {

        try {

            await transporter.sendMail({
                from: '" At port Hospital" <anandmaurya816@gmail.com>', // sender address
                to: email, // list of receivers
                subject: "Verify Your Email Address", // Subject line
                text: VeryficationCode, // plain text body
                html:`<!DOCTYPE html>
<html>
<head>
  <style>
    body {
      font-family: Arial, sans-serif;
      margin: 0;
      padding: 0;
      background-color: #f4f4f4;
    }
    .email-container {
      max-width: 600px;
      margin: 20px auto;
      background-color: #ffffff;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      overflow: hidden;
    }
    .email-header {
      background-color: #007bff;
      color: #ffffff;
      padding: 20px;
      text-align: center;
    }
    .email-header h1 {
      margin: 0;
      font-size: 24px;
    }
    .email-body {
      padding: 20px;
      color: #333333;
      line-height: 1.6;
    }
    .email-body p {
      margin: 10px 0;
    }
    .verification-code {
      display: inline-block;
      font-size: 20px;
      font-weight: bold;
      color: #007bff;
      background-color: #e9f7fe;
      padding: 10px 20px;
      border-radius: 5px;
      margin: 10px 0;
    }
    .email-footer {
      background-color: #f9f9f9;
      padding: 10px;
      text-align: center;
      font-size: 12px;
      color: #777777;
    }
    .email-footer a {
      color: #007bff;
      text-decoration: none;
    }
    .email-footer a:hover {
      text-decoration: underline;
    }
  </style>
</head>
<body>
  <div class="email-container">
    <div class="email-header">
      <h1>Your Verification Code</h1>
    </div>
    <div class="email-body">
      <p>Thank you for signing up with us/using our services. Please use the following code to verify your email address:</p>
      <div class="verification-code">${VeryficationCode}</div>
      <p> If you did not request this code, please ignore this email or contact our support team at <a href="#">support@prescripto.com</a>.</p>
      <p>Best regards,<br>Prescripto</p>
    </div>
    <div class="email-footer">
      <p>&copy; [Year] [Your Company Name]. All rights reserved.</p>
      <p><a href="#">Privacy Policy</a> | <a href="#">Terms of Service</a></p>
    </div>
  </div>
</body>
</html>
`, // html body
            });

        } catch (error) {
            console.log(error);

        }
    }

    sendEmail();

    res.json({ success: true, VeryficationCode })
}


// api for user Login
const userLogin = async (req, res) => {

    try {

        const { email, password } = req.body;

        const user = await userModel.findOne({ email });

        if (!user) {
            return res.json({ success: false, message: 'User dose not Exist' })
        }

        const isMatch = await bcryptjs.compareSync(password, user.password)
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

        const { userId, name, phone, address, dob, gender } = req.body;
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


export { registerUser, userLogin, getProfile, UpdatProfile, bookAppointment, listAppointment, emailVeryfication, cancelAppointment }
