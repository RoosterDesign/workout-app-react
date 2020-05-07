import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import firebase from 'firebase';
import FormInput from '../../Form/FormInput';
import FormButton from '../../Form/FormButton';

// TODO
// Loading Spinner
// Success message

const EditWorkout = ({ match }) => {
	const [workout, setWorkout] = useState({ name: '' });
	const history = useHistory();

	useEffect(() => {
		const unsubscribe = firebase
			.firestore()
			.collection('workouts')
			.doc(match.params.id)
			.onSnapshot((snapshot) => {
				const workout = snapshot.data();
				setWorkout({ name: workout.name });
			});
		return () => unsubscribe();
	}, [match.params.id]);

	const handleInputChange = (event) => {
		const { name, value } = event.target;
		setWorkout({ [name]: value });
	};

	const onSubmit = (e) => {
		e.preventDefault();
		firebase
			.firestore()
			.collection('workouts')
			.doc(match.params.id)
			.set({
				name: workout.name,
			})
			.then(() => {
				console.log('Updated!');
			});
	};

	const handleCancel = () => {
		history.goBack();
	};

	return (
		<div className="container">
			<h1>Edit workout</h1>
			<p>Lorem ipsum dolor sit amet consecetur</p>

			<form onSubmit={onSubmit} className="editWorkoutForm">
				<FormInput type="text" name="name" value={workout.name} placeholder="Enter workout name.." onChange={(event) => handleInputChange(event)} textAlign="center" required />

				<FormButton type="submit" label="Update" />
				<FormButton type="button" label="Cancel" onClick={() => handleCancel()} />
			</form>
		</div>
	);
};

export default EditWorkout;

EditWorkout.propTypes = {
	match: PropTypes.object.isRequired,
};
