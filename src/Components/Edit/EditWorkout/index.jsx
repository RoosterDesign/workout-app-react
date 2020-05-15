import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import firebase from 'firebase';
import WorkoutForm from '../../WorkoutForm';
import LoadingSpinner from '../../LoadingSpinner';
import Notification from '../../Notification';

const EditWorkout = ({ match }) => {
	const [isLoaded, setIsLoaded] = useState(false);
	const [notificationList, setNotificationList] = useState([]);
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
				setIsLoaded(true);
			});
		return () => unsubscribe();
	}, [match.params.id]);

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
				showNotification('success', 'Workout updated!');
			})
			.catch(() => {
				showNotification('error', "Oh no, there's been a problem!");
			});
	};

	const handleCancel = () => {
		history.goBack();
	};

	return (
		<>
			{!isLoaded && <LoadingSpinner />}
			<Notification notificationList={notificationList} />

			<div className="container">
				<h1>Edit workout</h1>
				<p>Lorem ipsum dolor sit amet consecetur</p>

				{isLoaded && <WorkoutForm type="edit" workout={workout} onSubmit={onSubmit} handleInputChange={handleInputChange} handleCancel={handleCancel} />}
			</div>
		</>
	);
};

export default EditWorkout;

EditWorkout.propTypes = {
	match: PropTypes.object.isRequired,
};
