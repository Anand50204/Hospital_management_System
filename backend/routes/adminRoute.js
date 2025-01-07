import express from "express";
import upload from "../middleware/multer.js";
import { addDoctor, adminDashBoard, AllDoctors, AppointmentCancel, appointmentsAdmin, loginAdmin } from "../controllers/adminController.js";
import authAdmin from "../middleware/authAdmin.js";
import {changeAvailablity} from "../controllers/doctorController.js";

const adminRouter = express.Router();

adminRouter.post('/add-doctor',authAdmin, upload.single('image'),addDoctor);
adminRouter.post('/login',loginAdmin);
adminRouter.post('/all-doctors',authAdmin,AllDoctors);
adminRouter.post('/change-availability',authAdmin,changeAvailablity);
adminRouter.get('/appointments',authAdmin,appointmentsAdmin);
adminRouter.post('/cancel-appointment',authAdmin,AppointmentCancel);
adminRouter.get('/dashboard',authAdmin,adminDashBoard);

export default adminRouter;