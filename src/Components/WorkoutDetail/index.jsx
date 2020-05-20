import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import firebase from '../../firebase';
import ExerciseList from '../ExerciseList';

// TODO
// If no exercises, link to 'add exercise'

const WorkoutDetail = ({ match }) => {
	const [workoutName, setWorkoutName] = useState('');
	const [exerciseIds, setExerciseIds] = useState([]);

	useEffect(() => {
		const unsubscribe = firebase
			.firestore()
			.collection('workouts')
			.doc(match.params.id)
			.onSnapshot((snapshot) => {
				setWorkoutName(snapshot.data().name);
				const allWorkoutIds = snapshot.data().exercises.map((item) => item.id);
				setExerciseIds(allWorkoutIds);
			});
		return () => unsubscribe();
	}, [match.params.id]);

	return (
		<div className="container">
			<h1 style={{ marginBottom: '20px' }}>{workoutName}</h1>
			<ExerciseList exerciseIds={exerciseIds} />
		</div>
	);
};

export default WorkoutDetail;

WorkoutDetail.propTypes = {
	match: PropTypes.object.isRequired,
};
