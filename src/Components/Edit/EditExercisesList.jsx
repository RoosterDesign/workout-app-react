import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import firebase from 'firebase';
import Breadcrumbs from '../Breadcrumbs';

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
				console.log('edit exercise - allExercises: ', allExercises);
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
		<>
			<Breadcrumbs>
				<Link to="/edit">Edit</Link> / Exercises
			</Breadcrumbs>
			<h1>Manage Exercises</h1>
			<table>
				<tbody>
					{exercises.map((exercise) => (
						<tr key={exercise.id}>
							<td>
								<p>{exercise.name}</p>
							</td>
							<td>
								<Link to={`/edit/exercises/${exercise.id}`}>Edit</Link>
							</td>
							<td>
								<button onClick={() => window.confirm('Are you sure you wish to delete this item?') && handleDelete(exercise.id)}>Delete</button>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</>
	);
};

export default EditExercisesList;
