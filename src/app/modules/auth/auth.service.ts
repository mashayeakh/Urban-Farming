import { prisma } from "@/app/lib/prisma";
import { ILoginUser, IRegisterUser } from "./auth.dto";
import { AppError } from "@/app/errorHelpers/AppError";
import status from "http-status";
import bcrypt from "bcrypt";
import { generateToken } from "@/app/utils/jwt";

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

        return await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
                role: role as any
            }
        })
    },

    async login(payload: ILoginUser) {
        const { email, password } = payload;

        // check if user exists
        const existingUser = await prisma.user.findUnique({
            where: {
                email
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

        return { ...existingUser, token };

    }

}