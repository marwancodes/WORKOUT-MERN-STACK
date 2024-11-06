

const WorkoutReducer = (state, action) => {

  switch (action.type) {
    case 'SET_WORKOUTS':
        return {
          ...state,
          workouts: action.payload,
          loading: false,
        };
    case 'CREATE_WORKOUT':
        return {
            ...state,
            workouts: [action.payload, ...state.workouts], // Add new workout to the front
          };
      case 'SET_LOADING':
        return {
          ...state,
          loading: action.payload,
        };
        case 'DELETE_WORKOUT':
            return {
              ...state,
              workouts: state.workouts.filter((wrk) => wrk._id !== action.payload), // Remove workout
            };
      case 'SET_ERROR':
        return {
          ...state,
          error: action.payload,
          loading: false,
        };
      default:
        return state;
  }
}

export default WorkoutReducer;