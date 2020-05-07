import React, { useState, useEffect } from 'react';
import firebase from 'firebase';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt, faTrash } from '@fortawesome/pro-solid-svg-icons';
import RoundIconButton from '../../RoundIconButton';
import ListItem from '../../ListItem';
import styles from './styles';

// TODO
// Delete confirm modal
// Successfully deleted message

const EditExercisesList = () => {
	const [exercises, setExercises] = useState([]);

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
			});
		return () => unsubscribe();
	}, []);

	const handleDelete = (id) => {
		firebase
			.firestore()
			.collection('exercises')
			.doc(id)
			.delete()
			.then(() => {
				console.log('Deleted!');
			})
			.catch((error) => {
				console.error('Error removing document: ', error);
			});
	};

	return (
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
						<RoundIconButton type="button" onClick={() => window.confirm('Are you sure you wish to delete this item?') && handleDelete(exercise.id)}>
							<FontAwesomeIcon icon={faTrash} />
						</RoundIconButton>
					</div>
				</ListItem>
			))}
			<style jsx>{styles}</style>
		</div>
	);
};

export default EditExercisesList;
