import { NextFunction, Request, Response } from "express";
import status from "http-status";
import jwt, { JwtPayload } from 'jsonwebtoken';
import { Role } from "prisma/generated/prisma/enums";

export const AuthMiddleware = {

    auth(...roles: Role[]) {
        return async (req: Request, res: Response, next: NextFunction) => {
            try {

                const token = req.headers.authorization;
                console.log({ "auth token": token })

                //if token does not exist then simple do not allow.. 
                if (!token) {
                    return res.status(500).json({
                        message: "you are not allowed"
                    });
                }

                //if exist then verify the token wheather it mathes with the correct one or not.. 
                const verifiedToken = jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayload

                console.log({ "Verified Tokden": verifiedToken })
                req.user = verifiedToken as any

                //check if role exist and role(admin/user) does not exist 
                if (roles.length && !roles.includes(verifiedToken.role as Role)) {
                    return res.status(500).json({
                        success: false,
                        error: "unauthorized"
                    })
                }

                //call the next(), to continue the process
                next();
            } catch (error: any) {
                res.status(500).json({
                    success: false,
                    message: error.message
                });
            }
        }
    }

}