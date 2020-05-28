import React, { useState } from 'react';
import firebase from 'firebase';
import WorkoutForm from '../WorkoutForm';
import Notification from '../Notification';

const AddWorkout = () => {
	const [workoutName, setWorkoutName] = useState('');
	const [exercises, setExercises] = useState([
		{
			name: '',
			weight: 0,
			sets: 0,
			reps: [0],
		},
	]);

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

	const inputChange = (event, index, repIndex) => {
		const { name, value, type } = event.target;

		if (name === 'workoutName') {
			setWorkoutName(value);
		} else {
			const updatedState = [...exercises];
			if (name === 'reps') {
				updatedState[index].reps[repIndex] = parseFloat(value);
			} else if (type === 'number') {
				updatedState[index][name] = parseFloat(value);
			} else {
				updatedState[index][name] = value;
			}
			setExercises(updatedState);
		}
	};

	const addExercise = () => {
		setExercises([
			...exercises,
			{
				name: '',
				weight: 0,
				sets: 0,
				reps: [0],
			},
		]);
	};

	const removeExercise = (index) => {
		if (exercises.length > 1) {
			const updatedState = [...exercises];
			updatedState.splice(index, 1);
			setExercises(updatedState);
		}
	};

	const addRep = (event, index) => {
		event.preventDefault();
		const updatedState = [...exercises];
		console.log('index: ', index);
		updatedState[index].reps.push(0);
		setExercises(updatedState);
	};

	const removeRep = (event, index, repIndex) => {
		event.preventDefault();
		if (exercises[index].reps.length > 1) {
			const updatedState = [...exercises];
			updatedState[index].reps.splice(repIndex, 1);
			setExercises(updatedState);
		}
	};

	const onSubmit = (e) => {
		e.preventDefault();
		firebase
			.firestore()
			.collection('workouts')
			.add({
				name: workoutName,
				exercises: exercises,
			})
			.then(() => {
				onReset();
				showNotification('success', 'Workout added!');
			})
			.catch(() => {
				showNotification('error', "Oh no, there's been a problem!");
			});
	};

	const onReset = () => {
		setWorkoutName('');
		setExercises([
			{
				name: '',
				weight: 0,
				sets: 0,
				reps: [0],
			},
		]);
	};

	return (
		<>
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
