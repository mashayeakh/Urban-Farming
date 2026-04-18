// //create access token
// //create refresh token

// import { JwtPayload, SignOptions } from "jsonwebtoken"
// import { generateToken } from "./jwt"

// //setAccessTokenToCookies
// //setRefreshTokenToCookies



// //create access token
// export const createAccesstoken = (payload: JwtPayload) => {
//     generateToken(
//         payload,
//         process.env.ACCESS_TOKEN,
//         {
//             expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN
//         } as SignOptions
//     )
// }