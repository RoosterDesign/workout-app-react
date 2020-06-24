import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import firebase from '../../config/firebase';
import LoadingSpinner from '../LoadingSpinner';
import ExerciseList from '../ExerciseList';

// TODO
// If no exercises, link to 'add exercise'

const WorkoutDetail = ({ match }) => {
	const [isLoaded, setIsLoaded] = useState(false);
	const [workoutName, setWorkoutName] = useState('');
	const [exercises, setExercises] = useState([]);

	useEffect(() => {
		const unsubscribe = firebase.db
			.collection('workouts')
			.doc(match.params.id)
			.onSnapshot((snapshot) => {
				const workout = snapshot.data();
				setWorkoutName(workout.name);
				setExercises(workout.exercises);
				setIsLoaded(true);
			});
		return () => unsubscribe();
	}, [match.params.id]);

	return (
		<>
			{!isLoaded && <LoadingSpinner />}
			{isLoaded && (
				<div className="container">
					<h1 style={{ marginBottom: '20px' }}>{workoutName}</h1>
					<ExerciseList workoutId={match.params.id} exerciseList={exercises} />
				</div>
			)}
		</>
	);
};

export default WorkoutDetail;

WorkoutDetail.propTypes = {
	match: PropTypes.object.isRequired,
};
