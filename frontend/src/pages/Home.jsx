import React, { useEffect } from 'react';
import useWorkoutsContext from '../hooks/useWorkoutsContext';
import axios from 'axios';
import useAuthContext from '../hooks/useAuthContext';

//TODO: components
import WorkoutDetails from '../components/WorkoutDetails';
import WorkoutForm from '../components/WorkoutForm';

const Home = () => {

  // const [workouts, setWorkouts] = useState([]);
  // const [loading, setLoading] = useState(true);

  // const {workouts, dispatch} = useWorkoutsContext();

  const { state, dispatch } = useWorkoutsContext();
  const { workouts, loading } = state;
  const {user} = useAuthContext();


  // Fetch workouts from the backend
  const fetchWorkouts = async () => {
    try {
      // instead use process.env.VITE_REACT_APP_BACKEND_BASEURL
      const { data } = await axios.get(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/workouts`, { 
        headers: {
          'Authorization': `Bearer ${user.token}` //! For Authorization Request
        }
      }); 
      
      // console.log(data);
      dispatch({ type: 'SET_WORKOUTS', payload: data});
      dispatch({ type: 'SET_LOADING', payload: false });
    } catch (error) {
      console.log('Fetching data error', error);
      dispatch({ type: 'SET_ERROR', payload: 'Error fetching workouts' });
    }
  };
  

    useEffect(() => {
      if (user) {
        fetchWorkouts();
      }
    }, [dispatch, user]);

  return (
    <div className='home'>
      <div className='workouts'>
        {loading ? (
          <p>Loading...</p>
        ) : (
          workouts && workouts.map((workout) => (
            <WorkoutDetails key={workout._id} workout={workout} />
          ))
        )}
      </div>
      <WorkoutForm />
    </div>
  )
}

export default Home