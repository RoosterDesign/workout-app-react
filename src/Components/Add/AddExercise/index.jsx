import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faTrash } from '@fortawesome/pro-solid-svg-icons';
import firebase from 'firebase';
import FormInput from '../../Form/FormInput';
import FormButton from '../../Form/FormButton';
import styles from './styles';

const initialState = {
	workoutId: '',
	name: '',
	sets: '',
	reps: [''],
	weight: '',
};

const AddExercise = () => {
	const [exerciseType, setExerciseType] = useState([]);
	const [exercise, setExercise] = useState(initialState);

	useEffect(() => {
		const unsubscribe = firebase
			.firestore()
			.collection('workouts')
			.onSnapshot((snapshot) => {
				const allWorkouts = snapshot.docs.map((doc) => ({
					id: doc.id,
					...doc.data(),
				}));
				console.log('add - allWorkouts: ', allWorkouts);
				setExerciseType(allWorkouts);
			});

		return () => unsubscribe();
	}, []);

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
			console.log('update number input: ', value);
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
			});
	};

	const resetForm = () => {
		setExercise(initialState);
	};

	return (
		<div className="container">
			<h1>Add an exercise</h1>
			<p>Lorem ipsum dolor sit amet consecetur</p>
			<form onSubmit={onSubmit}>
				<div>
					<label>Type</label>
					<br />
					<select name="workoutId" type="text" value={exercise.type} onChange={(event) => handleInputChange(event)} required>
						<option value="">Please select...</option>
						{exerciseType.map((type) => (
							<option value={type.id} key={type.name}>
								{type.name}
							</option>
						))}
					</select>
				</div>

				<FormInput type="text" name="name" value={exercise.name} placeholder="Enter exercise name.." onChange={(event) => handleInputChange(event)} required />

				<FormInput type="number" name="weight" value={exercise.weight} placeholder="Enter weight in kg.." onChange={(event) => handleInputChange(event)} step="0.25" required />

				<FormInput type="number" name="sets" value={exercise.sets} placeholder="Enter number of sets.." onChange={(event) => handleInputChange(event)} required />

				{exercise.reps.map((rep, index) => (
					<div key={index}>
						<div>
							{exercise.reps.length > 1 && (
								<button type="button" onClick={() => handleRemoveRepsField(index)}>
									<FontAwesomeIcon icon={faTrash} />
								</button>
							)}
							<FormInput type="number" name="reps" value={rep} placeholder="Enter number of reps.." onChange={(event) => handleInputChange(event, index)} required />
						</div>
					</div>
				))}

				<button type="button" onClick={() => handleAddRepsField()} className="addRepsBtn">
					<FontAwesomeIcon icon={faPlus} /> Add Rep (if different from first set)
				</button>

				<FormButton type="submit" label="Add Exercise" />
				<FormButton type="button" label="Reset" onClick={() => resetForm()} />
			</form>
			<style jsx>{styles}</style>
		</div>
	);
};

export default AddExercise;
