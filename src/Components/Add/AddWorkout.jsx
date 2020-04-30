import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import firebase from 'firebase';

const AddWorkout = () => {
	const [workout, setWorkout] = useState({ name: '' });

	const handleInputChange = (event) => {
		const { value } = event.target;
		setWorkout({ name: value });
	};

	const onSubmit = (e) => {
		e.preventDefault();
		firebase
			.firestore()
			.collection('workouts')
			.add(workout)
			.then(() => {
				setWorkout({ name: '' });
			});
	};

	return (
		<>
			<h1>Add a workout</h1>
			<form onSubmit={onSubmit}>
				<div>
					<label>Workout Name</label>
					<br />
					<input type="text" name="name" value={workout.name} placeholder="Enter workout name..." onChange={(event) => handleInputChange(event)} required />
				</div>
				<br />
				<button>Add Workout</button>
			</form>
		</>
	);
};

export default AddWorkout;
