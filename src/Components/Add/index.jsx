import React, { useState } from 'react';
import firebase from 'firebase';
import WorkoutForm from '../WorkoutForm';
import Notification from '../Notification';

const AddWorkout = () => {
	const initialExerciseState = {
		name: '',
		order: '',
		weight: '',
		sets: '',
		reps: [''],
	};

	const [workoutName, setWorkoutName] = useState('');
	const [exercises, setExercises] = useState([initialExerciseState]);

	const [notificationList, setNotificationList] = useState([]);

	const showNotification = (type, message) => {
		const id = Math.floor(Math.random() * 100 + 1);
		const notificationProperties = {
			id,
			type,
			message,
		};
		setNotificationList([...notificationList, notificationProperties]);
	};

	// const workoutNameInputChange(event) {
	// setWorkoutName(event.target.value);
	// }

	const inputChange = (event, index) => {
		const { name, value, type } = event.target;
		const updatedState = [...exercises];
		if (type === 'number') {
			updatedState[index][name] = parseFloat(value);
		} else {
			updatedState[index][name] = value;
		}
		setExercises(updatedState);
	};

	// const inputChange = (event) => {
	// const { name, value, type } = event.target;
	// if (name === 'name') {
	// 	setWorkoutName(value);
	// }
	// else if (name === 'reps') {
	// 	const updatedState = { ...exercise };
	// 	updatedState.reps[index] = parseFloat(value);
	// 	setExercises(updatedState);
	// }
	// else if (type === 'number') {
	// 	setExercises({ ...exercise, [name]: parseFloat(value) });
	// }
	// else {
	// 	setExercises({ ...exercise, [name]: value });
	// }
	// };

	const addExercise = () => {
		// const updatedState = { ...exercises };
		// updatedState.reps.push('');
		setExercises([...exercises, initialExerciseState]);
	};

	const removeExercise = (index) => {
		// if (exercise.reps.length > 1) {
		// 	const updatedState = { ...exercise };
		// 	updatedState.reps.splice(index, 1);
		// 	setExercise(updatedState);
		// }
	};

	const onSubmit = (e) => {
		e.preventDefault();
		firebase
			.firestore()
			.collection('workouts')
			.add(workout)
			.then(() => {
				setWorkout(initialState);
				showNotification('success', 'Workout added!');
			})
			.catch(() => {
				showNotification('error', "Oh no, there's been a problem!");
			});
	};

	const onReset = () => {
		setExercise(setWorkout);
	};

	return (
		<>
			{console.log('exercises: ', exercises)}
			<Notification notificationList={notificationList} />
			<div className="container">
				<h1>Add workout</h1>
				<p>Add a workout using the form below.</p>
				<WorkoutForm type="add" workoutName={workoutName} exercises={exercises} onSubmit={onSubmit} onReset={onReset} inputChange={inputChange} addExercise={addExercise} removeExercise={removeExercise} />
			</div>
		</>
	);
};

export default AddWorkout;
