import React, { useState, useEffect, useCallback } from 'react';
import update from 'immutability-helper';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import firebase from 'firebase';
import LoadingSpinner from '../../LoadingSpinner';
import Modal from '../../Modal';
import Notification from '../../Notification';
import WorkoutForm from '../../WorkoutForm';

const EditWorkout = ({ match }) => {
	const [isLoaded, setIsLoaded] = useState(false);
	const [notificationList, setNotificationList] = useState([]);
	const [hasModal, setHasModal] = useState(false);
	const [workoutName, setWorkoutName] = useState('');
	const [exercises, setExercises] = useState([]);
	const [exerciseToDelete, setExerciseToDelete] = useState('');
	const history = useHistory();

	useEffect(() => {
		console.log('match id: ', match.params.id);
		const unsubscribe = firebase
			.firestore()
			.collection('workouts')
			.doc(match.params.id)
			.onSnapshot((snapshot) => {
				const workout = snapshot.data();
				console.log('workout: ', workout);
				setWorkoutName(workout.name);
				setExercises(workout.exercises);
				setIsLoaded(true);
			});

		return () => unsubscribe();
	}, [match.params.id]);

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
		setIsLoaded(false);
		if (exercises.length > 1) {
			const updatedState = [...exercises];
			updatedState.splice(exerciseToDelete, 1);
			setExercises(updatedState);
			setIsLoaded(true);
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
			.doc(match.params.id)
			.set({
				name: workoutName,
				exercises: exercises,
			})
			.then(() => {
				showNotification('success', 'Workout updated!');
			})
			.catch(() => {
				showNotification('error', "Oh no, there's been a problem!");
			});
	};

	const onCancel = () => {
		history.goBack();
	};

	const closeModal = () => setHasModal(false);

	return (
		<>
			{!isLoaded && <LoadingSpinner />}
			<Notification notificationList={notificationList} />
			{hasModal && <Modal type="delete" title="Are you sure?" body="This action cannot be undone." closeModal={closeModal} handleDelete={handleDelete} />}

			<div className="container">
				<h1>Edit workout</h1>
				<p>Edit an workout using the form below. Drag and drop the exercise blocks to change the exercise order.</p>
				{isLoaded && (
					<>
						<WorkoutForm type="edit" workoutName={workoutName} exercises={exercises} onSubmit={onSubmit} onCancel={onCancel} inputChange={inputChange} addExercise={addExercise} confirmDelete={confirmDelete} addRep={addRep} removeRep={removeRep} />
					</>
				)}
			</div>
		</>
	);
};

export default EditWorkout;

EditWorkout.propTypes = {
	match: PropTypes.object.isRequired,
};
