import { catchAsync } from "@/app/shared/catchAsync";
import { AuthService } from "./auth.service";
import { Request, Response } from "express";
import { sendResponse } from "@/app/utils/sendResponse";
import status from "http-status";
import { prisma } from "@/app/lib/prisma";

export const AuthController = {
    async test(req: Request, res: Response) {
        const result = await AuthService.test();
        return res.json({
            message: result
        });
    },

    //!register
    register: catchAsync(
        async (req: Request, res: Response) => {
            const payload = req.body;
            const result = await AuthService.register(payload);

            sendResponse(res, {
                httpStatusCode: status.CREATED,
                success: true,
                message: "User registered successfully",
                data: result
            })
        }
    ),

    //!login
    login: catchAsync(
        async (req: Request, res: Response) => {
            const payload = req.body;
            const result = await AuthService.login(payload);

            console.log("Result token ", result.token)

            //set cookie automatically
            res.cookie("token", result.token, {
                httpOnly: true,
                secure: false,
                sameSite: "lax",
                maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
            })



            sendResponse(res, {
                httpStatusCode: status.OK,
                success: true,
                message: "User logged in successfully",
                data: result
            })
        }
    ),

    //! me
    me: catchAsync(
        async (req: Request, res: Response) => {
            const user = await AuthService.me(req?.user?.id as string); sendResponse(res, {
                httpStatusCode: status.OK,
                success: true,
                message: "User profile fetched successfully",
                data: user
            })
        }
    ),

    //!admin only
    adminOnly: catchAsync(
        async (req: Request, res: Response) => {
            sendResponse(res, {
                httpStatusCode: status.OK,
                success: true,
                message: "Admin content accessed successfully",
            })
        }
    )
}