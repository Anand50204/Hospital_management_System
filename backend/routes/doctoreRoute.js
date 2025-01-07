import express from "express";
import {appointmemtCancel, appointmemtComplet, appointmentDoctor, doctoreDashboard, doctorList, doctorProfile, loginDoctore, updatDoctorProfile} from "../controllers/doctorController.js";
import authDoctor from "../middleware/authDoctor.js";

const doctorRouter = express.Router()

doctorRouter.get('/list',doctorList)
doctorRouter.post('/login',loginDoctore);

doctorRouter.get('/appointment',authDoctor,appointmentDoctor);
doctorRouter.post('/copmlete-appointment',authDoctor,appointmemtComplet);
doctorRouter.post('/cancel-appointment',authDoctor,appointmemtCancel);
doctorRouter.get('/dashboard',authDoctor,doctoreDashboard);
doctorRouter.get('/profile',authDoctor,doctorProfile);
doctorRouter.post('/update-profile',authDoctor,updatDoctorProfile);

export default doctorRouter;