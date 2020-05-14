import React, { useEffect, useState } from 'react';
import firebase from 'firebase';
import ExerciseForm from '../../ExerciseForm';
import LoadingSpinner from '../../LoadingSpinner';
import Notification from '../../Notification';
import styles from './styles';

const AddExercise = () => {
	const initialState = {
		workoutId: '',
		name: '',
		sets: 0,
		reps: [0],
		weight: 0,
	};

	const [isLoaded, setIsLoaded] = useState(false);
	const [exerciseType, setExerciseType] = useState([]);
	const [exercise, setExercise] = useState(initialState);
	const [hasNotification, setHasNotification] = useState(false);

	useEffect(() => {
		const unsubscribe = firebase
			.firestore()
			.collection('workouts')
			.onSnapshot((snapshot) => {
				const allWorkouts = snapshot.docs.map((doc) => ({
					id: doc.id,
					...doc.data(),
				}));
				setExerciseType(allWorkouts);
				setIsLoaded(true);
			});

		return () => unsubscribe();
	}, [exercise]);

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
			.add(exercise)
			.then(() => {
				setExerciseType([]);
				setExercise(initialState);
				setHasNotification(true);
				window.scrollTo(0, 0);
				setTimeout(() => {
					setHasNotification(false);
				}, 3000);
			});
	};

	const resetForm = () => {
		setExercise(initialState);
	};

	return (
		<>
			{!isLoaded && <LoadingSpinner />}
			{hasNotification && <Notification type="success" body="Exercise added" />}
			<div className="container">
				<h1>Add exercise</h1>
				<p>Lorem ipsum dolor sit amet consecetur</p>

				{isLoaded && <ExerciseForm type="add" exercise={exercise} onSubmit={onSubmit} options={exerciseType} handleInputChange={handleInputChange} handleAddRepsField={handleAddRepsField} handleRemoveRepsField={handleRemoveRepsField} resetForm={resetForm} />}
			</div>
		</>
	);
};

export default AddExercise;
