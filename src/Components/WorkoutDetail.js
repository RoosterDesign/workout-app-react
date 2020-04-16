import React, {useState, useEffect} from 'react';
import firebase from '../firebase'
import ExerciseList from './ExerciseList'

function WorkoutDetail({ match }) {

  useEffect(() => {
    const unsubscribe = firebase.firestore()
      .collection('workouts')
      .doc(match.params.id)
      .onSnapshot(snapshot => {
        const workout = snapshot.data();
        setWorkout(workout)
      });
      return () => unsubscribe()
  },[match.params.id]);

  const [workout, setWorkout] = useState([]);

  return (
    <div>
      <h1>Workout: {workout.name}</h1>
      <ExerciseList workoutId={match.params.id} />
    </div>
  );
}

export default WorkoutDetail;
