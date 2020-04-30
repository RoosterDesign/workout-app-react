import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import firebase from 'firebase';

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
		<>
			<h1>Edit Workouts</h1>
			<table>
				<tbody>
					{workouts.map((workout) => (
						<tr key={workout.id}>
							<td>
								<p>{workout.name}</p>
							</td>
							<td>
								<Link to={`/edit/workouts/${workout.id}`} key={workout.id}>
									Edit
								</Link>
							</td>
							<td>
								<button onClick={() => window.confirm('Are you sure you wish to delete this item?') && handleDelete(workout.id)}>Delete</button>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</>
	);
};

export default EditWorkoutsList;
