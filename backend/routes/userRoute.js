
import express from 'express'
import { bookAppointment, cancelAppointment, getProfile, listAppointment, registerUser, UpdatProfile, userLogin } from "../controllers/userController.js";
import authUser from '../middleware/autheUser.js';

const userRouter = express.Router();

userRouter.post('/register',registerUser);
userRouter.post('/login',userLogin);

userRouter.get('/get-profile',authUser,getProfile);
userRouter.post('/update-profile',authUser,UpdatProfile);
userRouter.post('/book-appointment',authUser,bookAppointment);
userRouter.get('/appointments',authUser,listAppointment,);
userRouter.post('/cancel-appointment',authUser,cancelAppointment);
 
export default userRouter;