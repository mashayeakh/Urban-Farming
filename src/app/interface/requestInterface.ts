
// import { Role } from "@prisma/client";
// import { Role } from '../../../prisma/schema/enums.prisma';

import { Role } from "prisma/generated/prisma/enums";

export interface IRequestUser {
    userId: string,
    email: string,
    role: Role
}