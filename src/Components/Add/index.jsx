import React, { useState, useContext } from 'react';
import { AuthContext } from '../../Auth';
import firebase from '../../config/firebase';
import WorkoutForm from '../WorkoutForm';
import LoadingSpinner from '../LoadingSpinner';
import Modal from '../Modal';
import Notification from '../Notification';

const AddWorkout = () => {
	const { currentUser } = useContext(AuthContext);
	const [isSaving, setIsSaving] = useState(false);
	const [notificationList, setNotificationList] = useState([]);
	const [hasModal, setHasModal] = useState(false);
	const [workoutUID] = useState(currentUser.uid);
	const [workoutName, setWorkoutName] = useState('');
	const [exerciseToDelete, setExerciseToDelete] = useState('');
	const [exercises, setExercises] = useState([
		{
			name: '',
			weight: 0,
			sets: 0,
			reps: [0],
		},
	]);

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

	const confirmDelete = (event, index) => {
		event.preventDefault();
		console.log('confirm delete', index);
		setExerciseToDelete(index);
		setHasModal(true);
	};

	const handleDelete = () => {
		setHasModal(false);
		if (exercises.length > 1) {
			const updatedState = [...exercises];
			updatedState.splice(exerciseToDelete, 1);
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
		setIsSaving(true);
		firebase.db
			.collection('workouts')
			.add({
				uid: workoutUID,
				name: workoutName,
				exercises: exercises,
			})
			.then(() => {
				onReset();
				showNotification('success', 'Workout added!');
				setIsSaving(false);
			})
			.catch(() => {
				showNotification('error', "Oh no, there's been a problem!");
				setIsSaving(false);
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

	const closeModal = () => setHasModal(false);

	return (
		<>
			{isSaving && <LoadingSpinner />}
			<Notification notificationList={notificationList} />
			{hasModal && <Modal type="delete" title="Are you sure?" body="This action cannot be undone." closeModal={closeModal} handleDelete={handleDelete} />}
			<div className="container">
				<h1>Add workout</h1>
				<p>Add a workout using the form below.</p>
				<WorkoutForm type="add" workoutName={workoutName} exercises={exercises} onSubmit={onSubmit} onReset={onReset} inputChange={inputChange} addExercise={addExercise} confirmDelete={confirmDelete} addRep={addRep} removeRep={removeRep} />
			</div>
		</>
	);
};

export default AddWorkout;
