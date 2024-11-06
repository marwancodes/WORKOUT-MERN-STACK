import axios from 'axios';
import React, { useState } from 'react';
import { BsFillPlusCircleFill } from "react-icons/bs";
import useWorkoutsContext from '../hooks/useWorkoutsContext';
import useAuthContext from '../hooks/useAuthContext';


const WorkoutForm = () => {
    const { dispatch } = useWorkoutsContext(); // To automatically see it updated in the workouts list without refresh

    const [title, setTitle] = useState('');
    const [reps, setReps] = useState('');
    const [load, setLoad] = useState('');

    const [error, setError] = useState('');

    const { user } = useAuthContext();

    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent form from refreshing the page

        // Validation: check if any field is empty
        if (!title || !reps || !load) {
            setError('Please fill out all fields.');
            return;
        }

        //! For Authorization Request
        if (!user) {
            setError('You must be logged in');
            return
        }

        try {
            // Send POST request to backend
            const response = await axios.post(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/workouts`, {
                title,
                reps,
                load
            }, {
                headers: {   //! for Authorization Request
                    'Authorization': `Bearer ${user.token}`
                  }
            });
            // console.log("Workout added: ", response.data);

            // Clear form fields after submission
            setTitle('');
            setReps('');
            setLoad('');
            setError(''); // clear error
            

            // Dispatch the newly created workout to context
            dispatch({ type: 'CREATE_WORKOUT', payload: response.data });

        } catch (err) {
            console.log(err);
            setError('Failed to submit the workout.');
        }

    }

  return (
    <form className='create' onSubmit={handleSubmit}>
        <h3>Add a new Workout</h3>

        <label>Excersize Title:</label>
        <input type="text"
            onChange={(e) => setTitle(e.target.value)}
            value={title} 
            />

        <label>Load (in Kg):</label>
        <input type="number"
            onChange={(e) => setLoad(e.target.value)}
            value={load}
            />

        <label>Reps:</label>
        <input type="number"
            onChange={(e) => setReps(e.target.value)}
            value={reps}
            />

        <button type='submit'><BsFillPlusCircleFill />Add workout</button>

        {error && <div className='error'>{error}</div>}
    </form>
  );
}

export default WorkoutForm;