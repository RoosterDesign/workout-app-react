import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import firebase from 'firebase';

const EditExercisesList = () => {
	const [exercises, setExercises] = useState([]);

	useEffect(() => {
		const unsubscribe = firebase
			.firestore()
			.collection('exercises')
			.onSnapshot(snapshot => {
				const allExercises = snapshot.docs.map(doc => ({
					id: doc.id,
					...doc.data()
				}))
				setExercises(allExercises)
			})
			return() => unsubscribe;
	}, [])

	return (
		<div>
			<h1>Manage Exercises</h1>
			{exercises.map(exercise => (
				<Link to={`/edit/exercises/${exercise.id}`} key={exercise.id}>
					<h2>{exercise.name}</h2>
				</Link>
			))}
		</div>
	);
};

export default EditExercisesList;
