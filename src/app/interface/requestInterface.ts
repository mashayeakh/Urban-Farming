
// import { Role } from "@prisma/client";
// import { Role } from '../../../prisma/schema/enums.prisma';

import { Role } from "prisma/generated/prisma/enums";
import { status } from 'http-status';

export interface IRequestUser {
    id: string,
    email: string,
    name: string,
    status: string,
    role: Role
}