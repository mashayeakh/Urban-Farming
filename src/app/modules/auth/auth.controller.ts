import { catchAsync } from "@/app/shared/catchAsync";
import { AuthService } from "./auth.service";
import { Request, Response } from "express";
import { sendResponse } from "@/app/utils/sendResponse";
import status from "http-status";

export const AuthController = {
    async test(req: Request, res: Response) {
        const result = await AuthService.test();
        return res.json({
            message: result
        });
    },

    register: catchAsync(
        async (req: Request, res: Response) => {
            const payload = req.body;
            const result = await AuthService.register(payload);

            sendResponse(res, {
                httpStatusCode: status.CREATED,
                success: true,
                message: "User registered successfully",
                result
            })
        }
    ),

    login: catchAsync(
        async (req: Request, res: Response) => {
            const payload = req.body;
            const result = await AuthService.login(payload);

            sendResponse(res, {
                httpStatusCode: status.OK,
                success: true,
                message: "User logged in successfully",
                result
            })
        }
    ),

}