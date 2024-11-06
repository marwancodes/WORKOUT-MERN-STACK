import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import useWorkoutsContext from '../hooks/useWorkoutsContext';
import { BsFillPlusCircleFill } from "react-icons/bs";
import useAuthContext from '../hooks/useAuthContext';


const EditWorkout = () => {

    const { id } = useParams();
    const navigate = useNavigate();

    const [title, setTitle] = useState('');
    const [load, setLoad] = useState('');
    const [reps, setReps] = useState('');
    const [error, setError] = useState('');

    const { state, dispatch } = useWorkoutsContext();
    const { workouts, loading } = state;

    const { user } = useAuthContext();

    // Fetch workouts in the inputs
    const fetchWorkouts = async () => {
        try {
        const { data } = await axios.get(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/workouts/${id}`, {
            headers: {
                'Authorization': `Bearer ${user.token}` //! For Authorization Request
              }
        });
        setTitle(data.title);
        setLoad(data.load);
        setReps(data.reps);
      } catch (error) {
        console.log('Error fetching workout', error);
      }
    };

    // update workout
    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent form from refreshing the page

        // Validation: check if any field is empty
        if (!title || !reps || !load) {
            setError('Please fill out all fields.');
            return;
        }

        try {
            // Send POST request to backend
            await axios.patch(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/workouts/${id}`, {
                title,
                reps,
                load
            },{
                headers: {
                    'Authorization': `Bearer ${user.token}`
                  }
            });
            // console.log("Workout added: ", response.data);

            navigate('/');

        } catch (err) {
            console.log(err);
            setError('Failed to submit the workout.');
        }

    }
    

    useEffect(() => {
        fetchWorkouts();
    }, []);

  return (
    <div className='update'>
        <form className='formUpdate' onSubmit={handleSubmit}>
            <label htmlFor="title">Title</label>
            <input type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                />

            <label htmlFor="load">Load</label>
            <input type="number"
                value={load}
                onChange={(e) => setLoad(e.target.value)}
                />

            <label htmlFor="reps">Reps</label>
            <input type="number"
                value={reps}
                onChange={(e) => setReps(e.target.value)}
                />

            <button type='submit'><BsFillPlusCircleFill /> Update</button>

            {error && <div className="error">{error}</div>}
        </form>
    </div>
  )
}

export default EditWorkout;