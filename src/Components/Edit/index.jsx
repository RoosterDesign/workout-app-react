import React, { useState, useEffect } from 'react';
import firebase from 'firebase';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSort, faPencilAlt, faTrash } from '@fortawesome/pro-solid-svg-icons';
import RoundIconButton from '../RoundIconButton';
import ListItem from '../ListItem';
import LoadingSpinner from '../LoadingSpinner';
import Modal from '../Modal';
import Notification from '../Notification';
import styles from './styles';

const EditWorkoutList = () => {
	const [isLoaded, setIsLoaded] = useState(false);
	const [notificationList, setNotificationList] = useState([]);
	const [hasModal, setHasModal] = useState(false);
	const [workouts, setWorkouts] = useState([]);
	const [workoutToDelete, setWorkoutToDelete] = useState('');

	const showNotification = (type, message) => {
		const id = Math.floor(Math.random() * 100 + 1);
		const notificationProperties = {
			id,
			type,
			message,
		};
		setNotificationList([...notificationList, notificationProperties]);
	};

	useEffect(() => {
		const unsubscribe = firebase
			.firestore()
			.collection('workouts')
			.onSnapshot((snapshot) => {
				const allWorkouts = snapshot.docs.map((doc) => ({
					id: doc.id,
					...doc.data(),
				}));
				setWorkouts(allWorkouts);
				setIsLoaded(true);
			});
		return () => unsubscribe();
	}, []);

	const confirmDelete = (id) => {
		setWorkoutToDelete(id);
		setHasModal(true);
	};

	const handleDelete = () => {
		setHasModal(false);
		setIsLoaded(false);
		firebase
			.firestore()
			.collection('workouts')
			.doc(workoutToDelete)
			.delete()
			.then(() => {
				setIsLoaded(true);
				showNotification('success', 'Workout deleted!');
			})
			.catch((error) => {
				showNotification('error', "Oh no, there's been a problem!");
			});
	};

	const closeModal = () => setHasModal(false);

	return (
		<>
			{!isLoaded && <LoadingSpinner />}
			<Notification notificationList={notificationList} />

			{hasModal && <Modal type="delete" title="Are you sure?" body="This action cannot be undone." closeModal={closeModal} handleDelete={handleDelete} />}

			<div className="container">
				<h1>Edit workouts</h1>
				<p>Select a workout from below.</p>

				{workouts.map((workout) => (
					<ListItem key={workout.id}>
						<div className="name">{workout.name}</div>
						<div className="controls">
							<RoundIconButton type="link" href={`/edit/${workout.id}`}>
								<FontAwesomeIcon icon={faPencilAlt} />
							</RoundIconButton>
							<RoundIconButton type="link" href={`/edit/sort/${workout.id}`}>
								<FontAwesomeIcon icon={faSort} />
							</RoundIconButton>
							<RoundIconButton type="button" onClick={() => confirmDelete(workout.id)}>
								<FontAwesomeIcon icon={faTrash} />
							</RoundIconButton>
						</div>
					</ListItem>
				))}
				<style jsx>{styles}</style>
			</div>
		</>
	);
};

export default EditWorkoutList;
