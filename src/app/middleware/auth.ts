import { NextFunction, Request, Response } from "express";
import status from "http-status";
import jwt from 'jsonwebtoken';

export const auth = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(" ")[1];
    console.log("****Token", token)


    if (!token) {
        return res.status(status.UNAUTHORIZED).json({ message: "No token provided" });
    }

    try {
        //decode the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string);

        console.log("**** Decoded token ", decoded)
        req.user = decoded as any;
        next();



    } catch (error: any) {
        console.error("**** Error in auth middleware ", error)
        return res.status(status.UNAUTHORIZED).json({ message: "Invalid token" });
    }

}