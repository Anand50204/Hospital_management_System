
import express from 'express'
import { bookAppointment, cancelAppointment, emailVeryfication, getProfile, listAppointment, registerUser, resetUserPassword, UpdatProfile, userLogin } from "../controllers/userController.js";
import authUser from '../middleware/autheUser.js';

const userRouter = express.Router();

userRouter.post('/register',registerUser);
userRouter.post('/login',userLogin);

userRouter.get('/get-profile',authUser,getProfile);
userRouter.post('/update-profile',authUser,UpdatProfile);
userRouter.post('/book-appointment',authUser,bookAppointment);
userRouter.get('/appointments',authUser,listAppointment,);
userRouter.post('/cancel-appointment',authUser,cancelAppointment);
userRouter.post('/veryfication',emailVeryfication);
userRouter.post('/reset-passwod',resetUserPassword)
 
export default userRouter;