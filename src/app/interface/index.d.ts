import { IRequestUser } from "./requestInterface";

declare global {
    namespace Express {
        export interface Request {
            user?: IRequestUser
        }
    }
}