import { useReducer } from "react";
import { WorkoutContext } from "./WorkoutContext";
import WorkoutReducer from "./WorkoutReducer";

const WorkoutProvider = ({children}) => {
    const initialState = {
        workouts: [],
        loading: true,
        error: null,
      }
    const [state, dispatch] = useReducer(WorkoutReducer, initialState);

    return (
        <WorkoutContext.Provider value={{ state, dispatch }}>
            {children}
        </WorkoutContext.Provider>
    );
}

export default WorkoutProvider;