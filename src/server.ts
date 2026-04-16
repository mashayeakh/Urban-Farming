import express, { Application, Request, Response } from "express";
import { app } from "./app";
import dotenv from 'dotenv'


dotenv.config();

const port = process.env.PORT
console.log("port = ", process.env.PORT)

const bootstrap = async () => {
    try {

        // app.listen(envVars.PORT, () => {
        app.listen(port, () => {
            // console.log(`Server is running on http://localhost:${envVars.PORT}`);
            console.log(`Server is running on http://localhost:${port}`);
        });
    } catch (error) {
        console.log("Failed to start server", error)
    }
}

// Run listen only in non-serverless environments
// if (process.env.VERCEL !== '1') {
    bootstrap();
// } else {
//     // On Vercel: seed admin on cold start without listen()
//     // seedAdmin().catch(console.error);
// }

// Required export for Vercel serverless
export default app;