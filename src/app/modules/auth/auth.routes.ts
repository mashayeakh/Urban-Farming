import { Router } from "express";
import { AuthController } from "./auth.controller";
import { AuthMiddleware } from "@/app/middleware/auth";
import { Role } from "prisma/generated/prisma/enums";


const router = Router();

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

//!me
router.get(
    '/me',
    AuthMiddleware.auth(),
    AuthController.me
);

//!admin only
router.get(
    '/admin-only',
    AuthMiddleware.auth(Role.ADMIN),
    AuthController.adminOnly
)



export const AuthRouter = router;
