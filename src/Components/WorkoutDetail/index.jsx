import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import firebase from '../../firebase';
import ExerciseList from '../ExerciseList';
import Breadcrumbs from '../Breadcrumbs';

const WorkoutDetail = ({ match }) => {
	const [workout, setWorkout] = useState([]);

	useEffect(() => {
		const unsubscribe = firebase
			.firestore()
			.collection('workouts')
			.doc(match.params.id)
			.onSnapshot((snapshot) => {
				console.log('workout detail - snapshot.data(): ', snapshot.data());
				setWorkout(snapshot.data());
			});
		return () => unsubscribe();
	}, [match.params.id]);

	return (
		<>
			<Breadcrumbs>
				<Link to="/workouts">Select Workout</Link> / {workout.name}
			</Breadcrumbs>
			<h1>Workout: {workout.name}</h1>
			<ExerciseList workoutId={match.params.id} />
		</>
	);
};

export default WorkoutDetail;
