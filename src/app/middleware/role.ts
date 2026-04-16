import { NextFunction, Request, Response } from "express";
import { Role } from "prisma/generated/prisma/enums";

const role = (allowedRoles: string[]) => (req: Request, res: Response, next: NextFunction) => {
    // role not allowed
    if (!allowedRoles.includes(req?.user?.role as Role)) {
        return res.status(403).json({ message: "Forbidden" });
    }
    next();
}