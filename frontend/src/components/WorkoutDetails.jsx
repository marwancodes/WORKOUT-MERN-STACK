import React from 'react';
import axios from 'axios';
import { BsFillTrash3Fill } from "react-icons/bs";
import { BsPencilSquare } from "react-icons/bs";
import useWorkoutsContext from '../hooks/useWorkoutsContext';
import useAuthContext from '../hooks/useAuthContext';
// date fns
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import { Link } from 'react-router-dom';

const WorkoutDetails = ({ workout }) => {

  const { dispatch } = useWorkoutsContext();

  const { user } = useAuthContext();

  // Delete arrow function
  const handleClickDelete = async (id) => {
    
    try {

      //! For Authorization Request
      if (!user) {
        return
      }

      const response = await axios.delete(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/workouts/${id}`,{
        headers: {   //! for Authorization Request
            'Authorization': `Bearer ${user.token}`
          }
      });
      if (response.status === 200) {
        dispatch({ type: 'DELETE_WORKOUT', payload: id });
      }

    } catch (error) {
      console.log(error);
    }
  }


  return (
    <div className='workout-details'>
      <h4>{workout.title}</h4>
      <p><strong>Load (kg): </strong>{workout.load}</p>
      <p><strong>Reps: </strong>{workout.reps}</p>
      <p>{formatDistanceToNow(new Date(workout.createdAt), { addSuffix: true })}</p>
      {/* use this date library to set date and time, addSuffix to use that '1 hour ago' */}
      <span onClick={() => handleClickDelete(workout._id)}><BsFillTrash3Fill /> Delete</span>
      <Link to={`/edit/${workout._id}`} className='updatebtn'><BsPencilSquare /> Update</Link>
    </div>
  )
}

export default WorkoutDetails;