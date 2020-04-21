import React, { useState, useEffect } from 'react';
import firebase from '../firebase';
import ExerciseList from './ExerciseList';

const WorkoutDetail = ({ match }) => {
	const [workout, setWorkout] = useState([]);

	useEffect(() => {
		const unsubscribe = firebase
			.firestore()
			.collection('workouts')
			.doc(match.params.id)
			.onSnapshot((snapshot) => {
				setWorkout(snapshot.data());
			});
		return () => unsubscribe();
	}, [match.params.id]);

	return (
		<div>
			<h1>Workout: {workout.name}</h1>
			<ExerciseList workoutId={match.params.id} />
		</div>
	);
};

export default WorkoutDetail;
