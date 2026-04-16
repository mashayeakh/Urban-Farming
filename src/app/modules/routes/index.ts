
import express from 'express';
import { AuthRouter } from '../auth/auth.routes';

const router = express.Router();



//!Auth
router.use(
    "/auth",
    AuthRouter
);



export default router;