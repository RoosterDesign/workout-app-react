import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import firebase from 'firebase';
import ExerciseForm from '../../ExerciseForm';
import LoadingSpinner from '../../LoadingSpinner';
import Notification from '../../Notification';
import styles from './styles';

// TODO
// Change the way exercise is edited, add its doc id to the exercises array for each selected workout

const EditExercise = ({ match }) => {
	const initialState = {
		id: '',
		name: '',
		sets: '',
		reps: [''],
		weight: '',
	};

	const [isLoaded, setIsLoaded] = useState(false);
	const [notificationList, setNotificationList] = useState([]);
	const [workouts, setWorkouts] = useState([]);
	const [exercise, setExercise] = useState(initialState);
	const history = useHistory();

	useEffect(() => {
		const unsbuscribeWorkouts = firebase
			.firestore()
			.collection('workouts')
			.onSnapshot((snapshot) => {
				const allWorkouts = snapshot.docs.map((doc) => ({
					id: doc.id,
					...doc.data(),
				}));
				setWorkouts(allWorkouts);
			});

		const unsbuscribeExercises = firebase
			.firestore()
			.collection('exercises')
			.doc(match.params.id)
			.onSnapshot((snapshot) => {
				const exercise = snapshot.data();
				setExercise(exercise);
				setIsLoaded(true);
			});

		return () => {
			unsbuscribeWorkouts();
			unsbuscribeExercises();
		};
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

	const handleAddRepsField = () => {
		const updatedState = { ...exercise };
		updatedState.reps.push('');
		setExercise(updatedState);
	};

	const handleRemoveRepsField = (index) => {
		if (exercise.reps.length > 1) {
			const updatedState = { ...exercise };
			updatedState.reps.splice(index, 1);
			setExercise(updatedState);
		}
	};

	const handleInputChange = (event, index) => {
		const { name, value, type } = event.target;
		if (name === 'reps') {
			const updatedState = { ...exercise };
			updatedState.reps[index] = parseFloat(value);
			setExercise(updatedState);
		} else if (type === 'number') {
			setExercise({ ...exercise, [name]: parseFloat(value) });
		} else {
			setExercise({ ...exercise, [name]: value });
		}
	};

	const onSubmit = (e) => {
		e.preventDefault();
		firebase
			.firestore()
			.collection('exercises')
			.doc(match.params.id)
			.set({
				...exercise,
				name: exercise.name,
			})
			.then(() => {
				showNotification('success', 'Exercise updated!');
				window.scrollTo(0, 0);
			})
			.catch(() => {
				showNotification('error', "Oh no, there's been a problem!");
			});
	};

	const handleCancel = () => history.goBack();

	return (
		<>
			{!isLoaded && <LoadingSpinner />}

			{isLoaded && console.log(exercise.id)}

			<Notification notificationList={notificationList} />
			<div className="container">
				<h1>Edit exercise</h1>
				<p>Edit an exercise using the form below.</p>
				{isLoaded && <ExerciseForm type="edit" exercise={exercise} onSubmit={onSubmit} workouts={workouts} handleInputChange={handleInputChange} handleAddRepsField={handleAddRepsField} handleRemoveRepsField={handleRemoveRepsField} handleCancel={handleCancel} />}
			</div>
		</>
	);
};

export default EditExercise;

EditExercise.propTypes = {
	match: PropTypes.object.isRequired,
};
