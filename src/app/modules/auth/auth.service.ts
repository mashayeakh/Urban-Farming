import { prisma } from "@/app/lib/prisma";
import { ILoginUser, IRegisterUser } from "./auth.dto";
import { AppError } from "@/app/errorHelpers/AppError";
import status from "http-status";
import bcrypt from "bcrypt";
import { generateToken } from "@/app/utils/jwt";
import { Role } from "prisma/generated/prisma/enums";

export const AuthService = {
    async test() {
        return 'testing auth service';
    },

    async register(payload: IRegisterUser) {
        //to register a user, we need name, email, pass, role

        const { name, email, password, role } = payload;

        // check if user already exists
        const existingUser = await prisma.user.findUnique({
            where: {
                email
            }
        });

        if (existingUser) {
            throw new AppError(status.CONFLICT, "User already exists");
        }

        //hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        const safeRole = role === Role.VENDOR ? Role.VENDOR : Role.CUSTOMER


        return await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
                role: safeRole,
            },
            select: {
                id: true,
                name: true,
                email: true,
                role: true,
                status: true,
                createdAt: true,
            },
        });
    },

    //!login
    async login(payload: ILoginUser) {
        const { email, password } = payload;

        // check if user exists
        const existingUser = await prisma.user.findUnique({
            where: {
                email
            },
            select: {
                id: true,
                name: true,
                email: true,
                password: true,
                role: true,
                status: true,
                createdAt: true,
            }
        });

        if (!existingUser) {
            throw new AppError(status.NOT_FOUND, "User not found");
        }

        // check if password is correct
        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);

        if (!isPasswordCorrect) {
            throw new AppError(status.UNAUTHORIZED, "Invalid credentials");
        }

        //now token
        const token = generateToken(existingUser.id, existingUser.role);

        //send back user data without password 
        const { password: _, ...userWithoutPassword } = existingUser;
        return { ...userWithoutPassword, token };

    },

    //!me - logged in user profile
    async me(userId: string) {
        const user = await prisma.user.findUnique({
            where: {
                id: userId
            },
            select: {
                id: true,
                name: true,
                email: true,
                role: true,
                status: true,
                createdAt: true,
            }
        });

        console.log("uu", user)
        return user
    }

}