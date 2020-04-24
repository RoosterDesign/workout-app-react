import React, { useState, useEffect } from 'react';
import firebase from '../../firebase';
import styles from './styles';

const initialState = {
	workoutId: '',
	name: '',
	sets: '',
	reps: [''],
	weight: '',
};

const ExerciseList = ({ workoutId }) => {
	// const [chosen, setChosen] = useState();
	const [currentExercise, setCurrentExercise] = useState(initialState);
	const [exercises, setExercises] = useState([]);

	useEffect(() => {
		const unsubscribe = firebase
			.firestore()
			.collection('exercises')
			.where('workoutId', '==', workoutId)
			.onSnapshot((snapshot) => {
				const allExercises = snapshot.docs.map((doc) => ({
					id: doc.id,
					...doc.data(),
				}));
				console.log(allExercises);
				setExercises(allExercises);
			});
		return () => unsubscribe();
	}, [workoutId]);

	const handleClick = (id) => {
		const currentExerciseObj = exercises.find((el) => {
			return el.id === id;
		});
		setCurrentExercise(currentExercise.id !== id ? currentExerciseObj : initialState);
	};

	return (
		<>
			<h1>Exercise list...</h1>

			<div>
				<p>Selected Exercise: {currentExercise.name}</p>
			</div>

			<table>
				<thead>
					<tr>
						<th>Workout Name</th>
						<th>Reps</th>
						<th>Sets</th>
						<th>Weight</th>
					</tr>
				</thead>
				<tbody>
					{exercises.map((exercise) => (
						<tr key={exercise.id} className={exercise.id === currentExercise.id ? 'active' : ''} onClick={() => handleClick(exercise.id)}>
							<td>{exercise.name}</td>
							<td>
								{exercise.reps.map((rep, i) => (
									<span key={i}> {rep},</span>
								))}
							</td>
							<td>{exercise.sets}</td>
							<td>{exercise.weight}kg</td>
						</tr>
					))}
				</tbody>
			</table>
			<style jsx>{styles}</style>
		</>
	);
};

export default ExerciseList;
