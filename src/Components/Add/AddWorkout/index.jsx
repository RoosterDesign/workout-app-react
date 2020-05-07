import React, { useState } from 'react';
import firebase from 'firebase';
import FormInput from '../../Form/FormInput';
import FormButton from '../../Form/FormButton';

// TODO
// Success message

const AddWorkout = () => {
	const initialState = {
		name: '',
	};

	const [workout, setWorkout] = useState(initialState);

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
				setWorkout(initialState);
			});
	};

	return (
		<div className="container">
			<h1>Add workout</h1>
			<p>Lorem ipsum dolor sit amet consecetur</p>
			<form onSubmit={onSubmit}>
				<FormInput type="text" name="name" value={workout.name} placeholder="Enter workout name.." onChange={(event) => handleInputChange(event)} textAlign="center" required />
				<FormButton type="submit" label="Add Workout" />
			</form>
		</div>
	);
};

export default AddWorkout;
