import React, { useState } from 'react';
import firebase from 'firebase';
import WorkoutForm from '../WorkoutForm';
import Notification from '../Notification';

const AddWorkout = () => {
	const initialExerciseState = {
		name: '',
		weight: 0,
		sets: 0,
		reps: [0],
	};

	const [workoutName, setWorkoutName] = useState('');
	const [exercises, setExercises] = useState([initialExerciseState, initialExerciseState]);

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

	const inputChange = (event, index) => {
		const { name, value, type } = event.target;

		// console.log('exercises arr: ', exercises);
		// console.log('exercises index obj: ', index, exercises[index]);

		console.log('exercises 0: ', exercises[0]);
		console.log('index: ', index);

		const updatedState = [...exercises];
		updatedState[1].name = value;
		console.log('updatedState: ', updatedState);
		setExercises(updatedState);
		// setExercises(updatedState);

		// if (name === 'workoutName') {
		// setWorkoutName(value);
		// } else if (name === 'reps') {
		// updatedState[index].reps[repIndex] = parseFloat(value);
		// } else if (type === 'number') {
		// updatedState[index][name] = parseFloat(value);
		// } else {
		// const updatedState = [...exercises];
		//updatedState[index].name = value;
		// setExercises([...exercises, { [name]: value }]);
		// }
	};

	const addExercise = () => {
		// const updatedState = [...exercises];
		// updatedState.push(initialExerciseState);
		setExercises([...exercises, initialExerciseState]);
	};

	const removeExercise = (index) => {
		// if (exercises.length > 1) {
		// 	const updatedState = [...exercises];
		// 	updatedState.exercises.splice(index, 1);
		// 	setExercises(updatedState);
		// }
	};

	const addRep = () => {};

	const removeRep = () => {};

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
			{/* {console.log('workoutName: ', workoutName)} */}
			{console.log('exercises: ', exercises)}
			<Notification notificationList={notificationList} />
			<div className="container">
				<h1>Add workout</h1>
				<p>Add a workout using the form below.</p>
				<WorkoutForm type="add" workoutName={workoutName} exercises={exercises} onSubmit={onSubmit} onReset={onReset} inputChange={inputChange} addExercise={addExercise} removeExercise={removeExercise} addRep={addRep} removeRep={removeRep} />
			</div>
		</>
	);
};

export default AddWorkout;
