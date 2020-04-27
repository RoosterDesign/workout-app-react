import React, { useState, useEffect } from 'react';
import firebase from '../../firebase';
import classNames from 'classnames';
import styles from './styles';

const initialState = {
	workoutId: '',
	name: '',
	sets: '',
	reps: [''],
	weight: '',
};

const ExerciseList = ({ workoutId }) => {
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
					done: false,
				}));
				setExercises(allExercises);
			});
		return () => unsubscribe();
	}, [workoutId]);

	const handleClick = (id) => {
		const currentExerciseObj = exercises.find((el) => {
			return el.id === id;
		});

		if (!currentExerciseObj.done) {
			setCurrentExercise(currentExercise.id !== id ? currentExerciseObj : initialState);
		}
	};

	const handleDone = (e, index) => {
		e.stopPropagation();

		// Update state
		const newArr = [...exercises];
		newArr[index].done = !newArr[index].done;
		setExercises(newArr);

		// Auto-highligh next item in list
		if (index + 1 < newArr.length) {
			setCurrentExercise(newArr[index + 1]);
		}
	};

	return (
		<>
			<h1>Exercise list...</h1>

			<div>
				<p>
					Selected Exercise: {currentExercise.name}
					<br />
					Selected Sets: {currentExercise.sets}
					<br />
					Selected Reps: {currentExercise.reps}
					<br />
					Selected Weight: {currentExercise.weight}
				</p>
			</div>

			<table>
				<thead>
					<tr>
						<th>Workout Name</th>
						<th>Reps</th>
						<th>Sets</th>
						<th>Weight</th>
						<th></th>
					</tr>
				</thead>
				<tbody>
					{exercises.map((exercise, index) => (
						<tr
							key={exercise.id}
							className={classNames({
								active: exercise.id === currentExercise.id,
								done: exercise.done,
							})}
							onClick={() => handleClick(exercise.id)}
						>
							<td>{exercise.name}</td>
							<td>
								{exercise.reps.map((rep, i) => (
									<span key={i}> {rep},</span>
								))}
							</td>
							<td>{exercise.sets}</td>
							<td>{exercise.weight}kg</td>
							<td>
								<button type="button" onClick={(e) => handleDone(e, index)}>
									{exercise.done ? 'UN-DO' : 'DONE'}
								</button>
							</td>
						</tr>
					))}
				</tbody>
			</table>
			<style jsx>{styles}</style>
		</>
	);
};

export default ExerciseList;
