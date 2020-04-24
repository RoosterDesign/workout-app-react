import React, { useState } from 'react';
import { Link } from 'react-router-dom'
import firebase from 'firebase';
import Breadcrumbs from '../Breadcrumbs'

const AddWorkout = () => {
	const [workout, setWorkout] = useState({ name: '' });

	const handleInputChange = (event) => {
		const { value } = event.target;
		//const id = value.toLowerCase().replace(/[^a-zA-Z0-9]+(.)/g, (m, chr) => chr.toUpperCase());
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
			<Breadcrumbs>
				<Link to="/add">Add</Link> / Workout
			</Breadcrumbs>
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
		</>
	);
}

export default AddWorkout;
