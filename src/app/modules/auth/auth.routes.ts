import { Router } from "express";
import { AuthController } from "./auth.controller";


const router = Router();

//! test
router.get(
    '/test',
    AuthController.test
);

//! register
router.post(
    '/register',
    AuthController.register
);

//! login
router.post(
    '/login',
    AuthController.login
);


export const AuthRouter = router;
