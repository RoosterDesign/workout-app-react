import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import firebase from 'firebase';
import Breadcrumbs from '../Breadcrumbs';

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
				console.log('edit workout: ', workout);
				setWorkout({ name: workout.name });
			});
		return () => unsubscribe();
	}, [match.params.id]);

	const handleChange = (event) => {
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
		<>
			<Breadcrumbs>
				<Link to="/edit">Edit</Link> / <Link to="/edit/workouts">Workouts</Link> / {workout.name}
			</Breadcrumbs>
			<h1>Edit Workout: {workout.name}</h1>
			<form onSubmit={onSubmit}>
				<div>
					<label>Workout Name</label>
					<br />
					<input type="text" value={workout.name} name="name" onChange={(event) => handleChange(event)} />
				</div>
				<br />
				<button>Update</button>
				&nbsp;
				<button type="button" onClick={() => handleCancel()}>
					Cancel
				</button>
			</form>
		</>
	);
};

export default EditWorkout;
