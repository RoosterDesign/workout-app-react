import React, { useEffect, useState } from 'react';
import firebase from 'firebase';
import ExerciseForm from '../../ExerciseForm';
import LoadingSpinner from '../../LoadingSpinner';
import Notification from '../../Notification';
import styles from './styles';

// TODO
// Change the way exercise is added, add its doc id to the exercises array for each selected workout

const AddExercise = () => {
	const initialState = {
		id: '',
		name: '',
		sets: 0,
		reps: [0],
		weight: 0,
	};

	const [isLoaded, setIsLoaded] = useState(false);
	const [notificationList, setNotificationList] = useState([]);
	const [workouts, setWorkouts] = useState([]);
	const [exercise, setExercise] = useState(initialState);
	const [selectedWorkouts, setSelectedWorkouts] = useState([]);

	useEffect(() => {
		const unsubscribe = firebase
			.firestore()
			.collection('workouts')
			.onSnapshot((snapshot) => {
				const allWorkouts = snapshot.docs.map((doc) => ({
					id: doc.id,
					...doc.data(),
				}));
				setWorkouts(allWorkouts);
				setIsLoaded(true);
			});

		return () => unsubscribe;
	}, []);

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

		const ID = Math.random().toString(36).substr(2, 9);
		setExercise({ ...exercise, id: ID });

		const db = firebase.firestore();
		let batch = db.batch();

		const newExerciseRef = db.collection('exercises').doc();
		batch.set(newExerciseRef, exercise);

		selectedWorkouts.forEach((workout) => {
			batch.update(db.collection('workouts').doc(workout), { exercises: [{ id: exercise.id, name: exercise.name }] });
		});

		return batch
			.commit()
			.then(function () {
				setWorkouts([]);
				setExercise(initialState);
				showNotification('success', 'Exercise added!');
				window.scrollTo(0, 0);
			})
			.catch(() => {
				showNotification('error', "Oh no, there's been a problem!");
			});

		// db.collection('exercises')
		// 	.add(exercise)
		// 	.then(() => {
		// 		setExerciseType([]);
		// 		setExercise(initialState);
		// 		showNotification('success', 'Exercise added!');
		// 		window.scrollTo(0, 0);
		// 	})
		// 	.catch(() => {
		// 		showNotification('error', "Oh no, there's been a problem!");
		// 	});
	};

	const resetForm = () => {
		setExercise(initialState);
	};

	return (
		<>
			{!isLoaded && <LoadingSpinner />}
			<Notification notificationList={notificationList} />
			<div className="container">
				<h1>Add exercise</h1>
				<p>Add an exercise using the form below.</p>
				{isLoaded && <ExerciseForm type="add" exercise={exercise} onSubmit={onSubmit} workouts={workouts} handleInputChange={handleInputChange} handleAddRepsField={handleAddRepsField} handleRemoveRepsField={handleRemoveRepsField} resetForm={resetForm} />}
			</div>
		</>
	);
};

export default AddExercise;
