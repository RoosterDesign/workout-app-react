import React, { useState } from 'react';
import firebase from 'firebase';
import styles from './styles';
import FormInput from '../../Form/FormInput';
import FormButton from '../../Form/FormButton';

const initialState = {
	name: '',
};

const AddWorkout = () => {
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
			<h1>Add a workout</h1>
			<p>Lorem ipsum dolor sit amet consecetur</p>
			<form onSubmit={onSubmit} className="addWorkoutForm">
				<FormInput type="text" name="name" value={workout.name} placeholder="Enter workout name.." onChange={(event) => handleInputChange(event)} textAlign="center" required />
				<FormButton type="submit" label="Add Workout" />
			</form>
			<style jsx>{styles}</style>
		</div>
	);
};

export default AddWorkout;
