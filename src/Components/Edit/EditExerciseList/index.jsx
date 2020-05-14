import React, { useState, useEffect } from 'react';
import firebase from 'firebase';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt, faTrash } from '@fortawesome/pro-solid-svg-icons';
import RoundIconButton from '../../RoundIconButton';
import ListItem from '../../ListItem';
import LoadingSpinner from '../../LoadingSpinner';
import Modal from '../../Modal';
import Notification from '../../Notification';
import styles from './styles';

// TODO
// Delete confirm modal
// Successfully deleted message

const EditExercisesList = () => {
	const [isLoaded, setIsLoaded] = useState(false);
	const [exercises, setExercises] = useState([]);
	const [exerciseToDelete, setExerciseToDelete] = useState('');
	const [hasModal, setHasModal] = useState(false);
	const [hasNotification, setHasNotification] = useState(false);

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
				setHasNotification(true);
			})
			.catch((error) => {
				console.error('Error removing document: ', error);
			});
	};

	const closeModal = () => setHasModal(false);

	return (
		<>
			{!isLoaded && <LoadingSpinner />}
			{hasNotification && <Notification type="success" body="Exercise deleted!" />}
			{hasModal && <Modal type="delete" title="Are you sure?" body="This action cannot be undone." closeModal={closeModal} handleDelete={handleDelete} />}

			<div className="container">
				<h1>Edit exercises</h1>
				<p>Lorem ipsum dolor sit amet consecetur</p>

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
