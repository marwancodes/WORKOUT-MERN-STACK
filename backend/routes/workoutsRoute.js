import express from 'express';
import { createWorkout, deleteWorkoutById, getAllWorkouts, getWorkoutById, updateWorkoutById } from '../controllers/workoutController.js';
import requireAuth from '../middleware/requireAuth.js';


const router = express.Router();

// use Authentication middleware for all workout routes
router.use(requireAuth);



// GET All Workouts
router.get('/', getAllWorkouts);

// GET a Single Workout
router.get('/:id', getWorkoutById);

// POST a new Workout
router.post('/', createWorkout);

// DELETE a single Workout
router.delete('/:id', deleteWorkoutById);

// UPDATE  a single Workout
router.patch('/:id', updateWorkoutById);


export default router;


// API Endpoints
// GET    /workouts        --> Gets all the workouts documents
// POST   /workouts        --> Creates a new workout document
// GET    /workouts/:id    --> Get a single workout document 
// DELETE /workouts/:id    --> Delete a single workout document
// PATCH  /workouts/:id    --> Update a single workout document