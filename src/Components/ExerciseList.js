import React, {useState, useEffect} from 'react';
import firebase from '../firebase'

function ExerciseList({ workoutId }) {
    useEffect(() => {
        const unsubscribe = firebase.firestore()
          .collection('exercises')
          .where("type", "==", workoutId)
          .onSnapshot(snapshot => {
            const allExercises = snapshot.docs.map(doc => ({
              id: doc.id,
              ...doc.data()
            }));
            setExercises(allExercises)
          });    
          return () => unsubscribe();
      },[workoutId]);

    const [exercises, setExercises] = useState([]);

    return (
        <div>
            <h1>Exercise list...</h1>
            <ul>
            {
            exercises.map( (exercise, i) => (
                <li key={i}>
                Workout Name: {exercise.name}
                <br />
                Reps: 
                {exercise.reps.map( (rep, i) => <span key={i}> {rep},</span> )}
                <br />
                Sets: {exercise.sets}
                <br />
                Weight: {exercise.weight}kg
                </li>
            ))
            }
        </ul>
      </div>
    )
}

export default ExerciseList