import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import firebase from '../../firebase';
import ExerciseList from '../ExerciseList';

// TODO
// If no exercises, link to 'add exercise'

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
		<div className="container">
			<h1>{workout.name}</h1>
			<p>Lorem ipsum dolor sit amet consecetur</p>
			<ExerciseList workoutId={match.params.id} />
		</div>
	);
};

export default WorkoutDetail;

WorkoutDetail.propTypes = {
	match: PropTypes.object.isRequired,
};
