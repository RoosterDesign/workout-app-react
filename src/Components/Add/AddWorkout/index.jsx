import React, { useState } from 'react';
import firebase from 'firebase';
import WorkoutForm from '../../WorkoutForm';
import Notification from '../../Notification';

const AddWorkout = () => {
	const initialState = {
		name: '',
	};

	const [workout, setWorkout] = useState(initialState);
	// const [hasNotification, setHasNotification] = useState(false);

	const [notificationList, setNotificationList] = useState([]);
	const showNotification = (type, message) => {
		const id = Math.floor(Math.random() * 100 + 1);
		const notificationProperties = {
			id,
			type,
			message,
		};
		setNotificationList([...notificationList, notificationProperties]);
	};

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
				// setHasNotification(true);
				showNotification('success', 'Workout added!');
			});
	};

	return (
		<>
			{/* {hasNotification && <Notification type="success" body="Workout added" />} */}

			<Notification notificationList={notificationList} />

			<div className="container">
				<h1>Add workout</h1>
				<p>Lorem ipsum dolor sit amet consecetur</p>
				<WorkoutForm type="add" workout={workout} onSubmit={onSubmit} handleInputChange={handleInputChange} />
			</div>
		</>
	);
};

export default AddWorkout;
