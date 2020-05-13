import React, { useEffect, useState } from 'react';
import firebase from 'firebase';
import ExerciseForm from '../../ExerciseForm';
import Modal from '../../Modal';
import styles from './styles';

// TODO
// Success message

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
	const [modal, setModal] = useState(false);

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
				setModal(true);
			});
	};

	const resetForm = () => {
		setExercise(initialState);
	};

	const closeModal = () => setModal(false);

	return (
		<>
			{modal && <Modal type="success" title="Success!" body="This exercise has been added." closeModal={closeModal} />}

			<div className="container">
				<h1>Add exercise</h1>
				<p>Lorem ipsum dolor sit amet consecetur</p>
				{isLoaded && <ExerciseForm type="add" exercise={exercise} onSubmit={onSubmit} options={exerciseType} handleInputChange={handleInputChange} handleAddRepsField={handleAddRepsField} handleRemoveRepsField={handleRemoveRepsField} resetForm={resetForm} />}
			</div>
		</>
	);
};

export default AddExercise;
