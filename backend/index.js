    // Load environment variables from .env file
    import dotenv from 'dotenv';
    dotenv.config();

    import express from 'express';
    import { PORT } from './config.js'; // Only import PORT from config.js
    import mongoose from 'mongoose';
    import booksRoute from './routes/booksRoute.js';
    import cors from "cors";

    const app = express();

    // Middleware for parsing request body
    app.use(express.json());

    // Middleware for handling CORS POLICY
    // Option 1: Allow All Origins with Default of cors(*)
    app.use(cors());
    // Option 2: Allow Custom Origins
    // app.use(
    //   cors({
    //     origin: 'http://localhost:3000', // Replace with your frontend URL
    //     methods: ['GET', 'POST', 'PUT', 'DELETE'],
    //     allowedHeaders: ['Content-Type'],
    //   })
    // );


    app.get('/', (request, response) => {
        console.log(request);
        return response.status(234).send('Welcome To MERN STACK Tutorial');
    });

    // Middleware for parsing request body (already present, but good to note)
    app.use('/books', booksRoute);

    // Access MongoDB URL from environment variables
    const MONGODB_URL = process.env.MONGODB_URL;

    // Check if MONGODB_URL is defined
    if (!MONGODB_URL) {
        console.error("Error: MONGODB_URL is not defined in .env file.");
        process.exit(1); // Exit the process if the URL is missing
    }

    mongoose
        .connect(MONGODB_URL)
        .then(() => {
            console.log("App connected to database");
            app.listen(PORT, () => {
                console.log(`App is listening to port ${PORT}`);
            });
        })
        .catch((error) => {
            console.error("Database connection error:", error);
        });
    