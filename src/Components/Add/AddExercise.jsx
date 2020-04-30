import React, { useEffect, useState } from 'react';
import firebase from 'firebase';
import { Link } from 'react-router-dom';

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

	const handleChange = (event, index) => {
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
			});
	};

	const resetForm = () => {
		setExercise({
			workoutId: '',
			name: '',
			sets: '',
			reps: [''],
			weight: '',
		});
	};

	return (
		<>
			<h1>Add an exercise</h1>
			<form onSubmit={onSubmit}>
				<div>
					<label>Type</label>
					<br />
					<select name="workoutId" type="text" value={exercise.type} onChange={(event) => handleChange(event)} required>
						<option value="">Please select...</option>
						{exerciseType.map((type) => (
							<option value={type.id} key={type.name}>
								{type.name}
							</option>
						))}
					</select>
				</div>
				<div>
					<label>Name</label>
					<br />
					<input name="name" type="text" value={exercise.name} onChange={(event) => handleChange(event)} required placeholder="Enter exercise name..." />
				</div>
				<div>
					<label>Sets</label>
					<br />
					<input name="sets" min="0" type="number" value={exercise.sets} onChange={(event) => handleChange(event)} required placeholder="Enter number of sets..." />
				</div>
				<div>
					<label>Reps</label>
					<br />
					{exercise.reps.map((rep, index) => (
						<div key={index}>
							<input name="reps" min="0" type="number" value={rep} onChange={(event) => handleChange(event, index)} required placeholder="Enter number of reps..." />
							<button type="button" onClick={() => handleAddRepsField()}>
								+ ADD
							</button>
							{exercise.reps.length > 1 && (
								<button type="button" onClick={() => handleRemoveRepsField(index)}>
									- REMOVE
								</button>
							)}
						</div>
					))}
				</div>
				<div>
					<label>Weight</label>
					<br />
					<input name="weight" min="0" step="0.25" type="number" value={exercise.weight} onChange={(event) => handleChange(event)} required placeholder="Enter weight in kg..." />
				</div>
				<br />
				<button>Add Exercise</button> &nbsp;
				<button type="button" onClick={() => resetForm()}>
					Reset
				</button>
			</form>
		</>
	);
};

export default AddExercise;
