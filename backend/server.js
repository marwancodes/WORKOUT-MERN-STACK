import express from 'express';
import { config } from 'dotenv';
import cors from 'cors';
import workoutRoutes from "./routes/workoutsRoute.js";
import userRoutes from "./routes/userRoute.js"
import mongoose from 'mongoose';


// Load environment variables from .env file
config();

// Express app
const app = express();

// PORT
const PORT = process.env.PORT || 3000;

// middleware
app.use(cors(
    {
        origin: ["https://workout-mern-stack-euyv.vercel.app"],
        methods: ["POST", "GET"],
        credentials: true
    }
));
app.use(express.json())
app.use((req, res, next) => {  // next function: to let go to the next middleware, which is mean the request can't complet
    console.log(req.path, req.method);
    next();
})

// routes
app.use('/api/workouts', workoutRoutes);
app.use('/api/user', userRoutes);


// connect to db with running server
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        // Running the server
        app.listen(PORT, () => {
            console.log(`Connected to db & Running on PORT: ${PORT}`);
        });
    })
    .catch((error) => {
        console.log(error);
    })



// API Endpoints
// GET    /workouts        --> Gets all the workouts documents
// POST   /workouts        --> Creates a new workout document
// GET    /workouts/:id    --> Get a single workout document 
// DELETE /workouts/:id    --> Delete a single workout document
// PATCH  /workouts/:id    --> Update a single workout document