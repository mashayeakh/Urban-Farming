import express, { Application, NextFunction, Request, Response } from 'express';
import router from './app/modules/routes';
import { errorHandler } from './app/middleware/globalErrorHandler';


export const app: Application = express()





// Parse JSON bodies
app.use(express.json());

// Parse Cookie header into req.cookies
// app.use(cookieParser());

// Better Auth routes - Let Better Auth handle ALL auth routes
// app.all("/api/auth/*splat", toNodeHandler(auth));


// Parse URL-encoded bodies (optional, but good to have)
// app.use(express.urlencoded({ extended: true }));


app.get('/health', (req: Request, res: Response) => {
    res.send('Hello Urban Farming!')
})
app.use("/api/v1/", router);

//global error handler
app.use(errorHandler);

// //not found
// app.use(notFound);
