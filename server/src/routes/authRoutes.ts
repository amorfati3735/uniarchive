import express from 'express';
import { sendOtp, verifyOtp } from '../controllers/authController';

const router = express.Router();

router.post('/otp', sendOtp);
router.post('/verify', verifyOtp);

export default router;
