import React, { useState } from 'react';
import firebase from 'firebase';

const AddWorkout = () => {
	const [workout, setWorkout] = useState({ id: '', name: '' });

	const handleInputChange = (event) => {
		const { value } = event.target;
		const id = value.toLowerCase().replace(/[^a-zA-Z0-9]+(.)/g, (m, chr) => chr.toUpperCase());
		setWorkout({ id, name: value });
	};

	const onSubmit = (e) => {
		e.preventDefault();
		firebase
			.firestore()
			.collection('workouts')
			.add(workout)
			.then(() => {
				setWorkout({ id: '', name: '' });
			});
	};

	return (
		<div>
			<h1>Add a workout</h1>
			{/* <pre>{JSON.stringify(workout)}</pre> */}
			<form onSubmit={onSubmit}>
				<div>
					<label>Workout Name</label>
					<br />
					<input type="text" name="name" value={workout.name} placeholder="Enter workout name..." onChange={(event) => handleInputChange(event)} required />
				</div>
				<br />
				<button>Add Workout</button>
			</form>
		</div>
	);
}

export default AddWorkout;
