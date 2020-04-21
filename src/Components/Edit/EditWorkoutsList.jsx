import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import firebase from 'firebase';

const EditWorkoutsList = () => {
	const [workouts, setWorkouts] = useState([]);

	useEffect(() => {
		const unsubscribe = firebase
			.firestore()
			.collection('workouts')
			.onSnapshot(snapshot => {
				const allWorkouts = snapshot.docs.map(doc => ({
					id: doc.id,
					...doc.data(),
				}));
				setWorkouts(allWorkouts);
			});
		return () => unsubscribe;
	}, []);

	return (
		<div>
			<h1>Edit Workouts</h1>
			{workouts.map(workout => (
				<Link to={`/edit/workouts/${workout.id}`} key={workout.id}>
					<h2>{workout.name}</h2>
				</Link>
			))}
		</div>
	);
};

export default EditWorkoutsList;
