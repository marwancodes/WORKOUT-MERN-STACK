import { Workout } from "../models/workoutModel.js";
import mongoose from "mongoose";



//TODO: get all wokrouts
export const getAllWorkouts = async (req, res) => {
    try {
        const user_id = req.user._id;
        const workouts = await Workout.find({ user_id }).sort({createdAt: -1}); // sort(...) to show the last one on the top
        return res.status(200).send(workouts);
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: error.message });
    }
}

//TODO: get a single workout
export const getWorkoutById = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ message: 'Workout not found' });
        }

        const workout = await Workout.findById(id);

        if (!workout) {
            return res.status(404).json({ message: 'Workout not found' });
        }

        return res.status(200).send(workout);
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: error.message });
    }
}

//TODO: create new workout
export const createWorkout = async (req, res) => {

    //* Add workout to db
    try {
        const { title, reps, load } = req.body;
        const user_id = req.user._id;

        // Validate request data
        if (!title || !reps || !load) {
            return res.status(400).send({
                message: 'Required fields are missing'
            });
        }

        // Create the new workout
        const newWorkout = { title, reps, load, user_id };

        // Save the new workout to the database
        const workout = await Workout.create(newWorkout);

        // Send back the created workout as a response
        return res.status(201).send(workout);
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: error.message });
    }
}

//TODO: delete a workout
export const deleteWorkoutById = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ message: 'Workout not found' });
        }

        const workout = await Workout.findByIdAndDelete(id);

        if (!workout) {
            return res.status(404).json({ message: 'Workout not found' });
        }

        return res.status(200).send({ message: 'Workout Successfully deleted', deleteWorkout: workout});
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: error.message });
    }
}

//TODO: update a workout
export const updateWorkoutById = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ message: 'Workout not found' });
        }

        const { title, reps, load } = req.body;

        // Validate input fields
        if (!title || !reps || !load) {
            return res.status(400).send({message: 'Required fields are missing'});
        }

        const workout = await Workout.findByIdAndUpdate(
            id,
            { title, reps, load },
            { new: true }
        );

        if (!workout) {
            return res.status(404).json({ message: 'Workout not found' });
        }

        return res.status(200).send(workout);
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: error.message });
    }
}
