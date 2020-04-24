import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import firebase from 'firebase';
import Breadcrumbs from '../Breadcrumbs';

const EditExercise = ({ match }) => {
	const [workouts, setWorkouts] = useState([]);
	const [exercise, setExercise] = useState({
		workoutId: '',
		name: '',
		sets: '',
		reps: [''],
		weight: '',
	});
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
				console.log(allWorkouts);
				setWorkouts(allWorkouts);
			});

		const unsbuscribeExercises = firebase
			.firestore()
			.collection('exercises')
			.doc(match.params.id)
			.onSnapshot((snapshot) => {
				const exercise = snapshot.data();
				setExercise(exercise);
			});

		return () => {
			unsbuscribeWorkouts();
			unsbuscribeExercises();
		};
	}, [match.params.id]);

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
			.doc(match.params.id)
			.set({
				...exercise,
				name: exercise.name,
			})
			.then(() => {
				console.log('Updated!');
			});
	};

	const handleCancel = () => {
		history.goBack();
	};

	return (
		<>
			<Breadcrumbs>
				<Link to="/edit">Edit</Link> / <Link to="/edit/exercises">Exercises</Link> / {exercise.name}
			</Breadcrumbs>
			<h1>Edit exercise: {exercise.name}</h1>
			<form onSubmit={onSubmit}>
				<div>
					<label>workoutId</label>
					<br />

					<select name="workoutId" type="text" value={exercise.workoutId} onChange={(event) => handleChange(event)} required>
						<option value="">Please select...</option>
						{workouts.map((workout) => (
							<option value={workout.id} key={workout.name}>
								{workout.name}
							</option>
						))}
					</select>
				</div>
				<br />
				<div>
					<label>Name</label>
					<br />
					<input type="text" name="name" value={exercise.name} onChange={(event) => handleChange(event)} />
				</div>
				<br />
				<div>
					<label>sets</label>
					<br />
					<input type="number" name="sets" value={exercise.sets} onChange={(event) => handleChange(event)} />
				</div>
				<br />
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
				<br />
				<div>
					<label>Weight</label>
					<br />
					<input type="number" name="weight" value={exercise.weight} onChange={(event) => handleChange(event)} />
				</div>
				<br />
				<button>Update</button>
				&nbsp;&nbsp;
				<button type="button" onClick={() => handleCancel()}>
					Cancel
				</button>
			</form>
		</>
	);
};

export default EditExercise;
