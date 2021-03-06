import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../../Auth';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import firebase from '../../../config/firebase';
import LoadingSpinner from '../../LoadingSpinner';
import Modal from '../../Modal';
import Notification from '../../Notification';
import WorkoutForm from '../../WorkoutForm';

const EditWorkout = ({ match }) => {
	const { currentUser } = useContext(AuthContext);
	const [isLoaded, setIsLoaded] = useState(false);
	const [isSaving, setIsSaving] = useState(false);
	const [notificationList, setNotificationList] = useState([]);
	const [hasModal, setHasModal] = useState(false);
	const [workoutUID, setWorkoutUID] = useState('');
	const [workoutName, setWorkoutName] = useState('');
	const [exercises, setExercises] = useState([]);
	const [exerciseToDelete, setExerciseToDelete] = useState('');
	const history = useHistory();

	useEffect(() => {
		const unsubscribe = firebase.db
			.collection('workouts')
			.doc(match.params.id)
			.onSnapshot((snapshot) => {
				const workout = snapshot.data();
				setWorkoutUID(workout.uid);
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
		setIsSaving(true);
		firebase.db
			.collection('workouts')
			.doc(match.params.id)
			.set({
				uid: currentUser.uid,
				name: workoutName,
				exercises: exercises,
			})
			.then(() => {
				showNotification('success', 'Workout updated!');
				setIsSaving(false);
			})
			.catch(() => {
				showNotification('error', "Oh no, there's been a problem!");
				setIsSaving(false);
			});
	};

	const onCancel = () => {
		history.goBack();
	};

	const closeModal = () => setHasModal(false);

	return (
		<>
			{(!isLoaded || isSaving) && <LoadingSpinner />}
			<Notification notificationList={notificationList} />
			{hasModal && <Modal type="delete" title="Are you sure?" body="This action cannot be undone." closeModal={closeModal} handleDelete={handleDelete} />}

			<div className="container">
				<h1>Edit workout</h1>
				<p>Edit an workout using the form below. Drag and drop the exercise blocks to change the exercise order.</p>

				{isLoaded && currentUser.uid === workoutUID ? <WorkoutForm type="edit" workoutName={workoutName} exercises={exercises} onSubmit={onSubmit} onCancel={onCancel} inputChange={inputChange} addExercise={addExercise} confirmDelete={confirmDelete} addRep={addRep} removeRep={removeRep} /> : <p>YOU DONT HAVE ACCESS TO VIEW THIS WORKOUT</p>}
			</div>
		</>
	);
};

export default EditWorkout;

EditWorkout.propTypes = {
	match: PropTypes.object.isRequired,
};
