import { WorkoutContext } from "../contexts/WorkoutContext";
import { useContext } from "react";

const useWorkoutsContext = () => {
    const context = useContext(WorkoutContext);

    if (!context) {
        throw Error("useWorkoutContext must be used inside an WorkoutProvider");
    }

    return context;
}


export default useWorkoutsContext;