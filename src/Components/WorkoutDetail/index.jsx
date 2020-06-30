import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../Auth';
import PropTypes from 'prop-types';
import firebase from '../../config/firebase';
import LoadingSpinner from '../LoadingSpinner';
import ExerciseList from '../ExerciseList';

const WorkoutDetail = ({ match }) => {
	const { currentUser } = useContext(AuthContext);
	const [isLoaded, setIsLoaded] = useState(false);
	const [workoutUID, setWorkoutUID] = useState('');
	const [workoutName, setWorkoutName] = useState('');
	const [exercises, setExercises] = useState([]);

	useEffect(() => {
		const unsubscribe = firebase.db
			.collection('workouts')
			.doc(match.params.id)
			.onSnapshot((snapshot) => {
				const workout = snapshot.data();
				setWorkoutUID(workout.uid);
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
					{currentUser.uid === workoutUID ? (
						<>
							<h1 style={{ marginBottom: '20px' }}>{workoutName}</h1>
							<ExerciseList workoutId={match.params.id} exerciseList={exercises} />
						</>
					) : (
						<p>YOU DONT HAVE ACCESS TO VIEW THIS WORKOUT</p>
					)}
				</div>
			)}
		</>
	);
};

export default WorkoutDetail;

WorkoutDetail.propTypes = {
	match: PropTypes.object.isRequired,
};
