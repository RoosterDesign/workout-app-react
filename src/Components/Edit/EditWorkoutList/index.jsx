import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import firebase from 'firebase';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt, faTrash } from '@fortawesome/pro-solid-svg-icons';
import RoundIconButton from '../../RoundIconButton';
import ListItem from '../../ListItem';
import styles from './styles';

const EditWorkoutsList = () => {
	const [workouts, setWorkouts] = useState([]);

	useEffect(() => {
		const unsubscribe = firebase
			.firestore()
			.collection('workouts')
			.onSnapshot((snapshot) => {
				const allWorkouts = snapshot.docs.map((doc) => ({
					id: doc.id,
					...doc.data(),
				}));
				console.log('edit workout - allWorkouts: ', allWorkouts);
				setWorkouts(allWorkouts);
			});
		return () => unsubscribe();
	}, []);

	const handleDelete = (id) => {
		firebase
			.firestore()
			.collection('workouts')
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
			<h1>Edit workouts</h1>
			<p>Lorem ipsum dolor sit amet consecetur</p>

			{workouts.map((workout) => (
				<ListItem key={workout.id}>
					<div className="name">{workout.name}</div>

					<div className="controls">
						<RoundIconButton type="link" href={`/edit/workouts/${workout.id}`}>
							<FontAwesomeIcon icon={faPencilAlt} />
						</RoundIconButton>

						<RoundIconButton type="button" onClick={() => window.confirm('Are you sure you wish to delete this item?') && handleDelete(workout.id)}>
							<FontAwesomeIcon icon={faTrash} />
						</RoundIconButton>
					</div>
				</ListItem>
			))}
			<style jsx>{styles}</style>
		</div>
	);
};

export default EditWorkoutsList;
