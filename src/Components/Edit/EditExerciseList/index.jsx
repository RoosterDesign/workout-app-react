import React, { useState, useEffect } from 'react';
import firebase from 'firebase';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt, faTrash } from '@fortawesome/pro-solid-svg-icons';
import RoundIconButton from '../../RoundIconButton';
import Modal from '../../Modal';
import ListItem from '../../ListItem';
import LoadingSpinner from '../../LoadingSpinner';
import Notification from '../../Notification';
import styles from './styles';

const EditExercisesList = () => {
	const [isLoaded, setIsLoaded] = useState(false);
	const [notificationList, setNotificationList] = useState([]);
	const [hasModal, setHasModal] = useState(false);
	const [exercises, setExercises] = useState([]);
	const [exerciseToDelete, setExerciseToDelete] = useState('');

	useEffect(() => {
		const unsubscribe = firebase
			.firestore()
			.collection('exercises')
			.onSnapshot((snapshot) => {
				const allExercises = snapshot.docs.map((doc) => ({
					id: doc.id,
					...doc.data(),
				}));
				setExercises(allExercises);
				setIsLoaded(true);
			});
		return () => unsubscribe();
	}, []);

	const showNotification = (type, message) => {
		const id = Math.floor(Math.random() * 100 + 1);
		const notificationProperties = {
			id,
			type,
			message,
		};
		setNotificationList([...notificationList, notificationProperties]);
	};

	const confirmDelete = (id) => {
		setExerciseToDelete(id);
		setHasModal(true);
	};

	const handleDelete = () => {
		setHasModal(false);
		setIsLoaded(false);
		firebase
			.firestore()
			.collection('exercises')
			.doc(exerciseToDelete)
			.delete()
			.then(() => {
				setIsLoaded(true);
				showNotification('success', 'Exercise deleted!');
			})
			.catch(() => {
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
				<h1>Edit exercises</h1>
				<p>Select an exercise from below.</p>

				{exercises.map((exercise) => (
					<ListItem key={exercise.id}>
						<div className="name">{exercise.name}</div>
						<div className="controls">
							<RoundIconButton type="link" href={`/edit/exercises/${exercise.id}`}>
								<FontAwesomeIcon icon={faPencilAlt} />
							</RoundIconButton>
							<RoundIconButton type="button" onClick={() => confirmDelete(exercise.id)}>
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

export default EditExercisesList;
