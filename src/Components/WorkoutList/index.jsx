import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import firebase from '../../firebase';
import Nav from '../Nav';

const WorkoutList = () => {
	const [workouts, setWorkouts] = useState([]);

	useEffect(() => {
		console.log('getting workouts...');
		const unsubscribe = firebase
			.firestore()
			.collection('workouts')
			.onSnapshot((snapshot) => {
				const allWorkouts = snapshot.docs.map((doc) => ({
					id: doc.id,
					...doc.data(),
				}));
				console.log('worokut list - allWorkouts: ', allWorkouts);
				setWorkouts(allWorkouts);
			});
		return () => unsubscribe();
	}, []);

	return (
		<>
			<Nav />
			<h1>Select a workout...</h1>
			{workouts.map((workout) => (
				<Link to={`/workouts/${workout.id}`} key={workout.id}>
					<h2>{workout.name}</h2>
				</Link>
			))}
		</>
	);
};

export default WorkoutList;
