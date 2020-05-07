import React, { useState, useEffect } from 'react';
import firebase from 'firebase';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDumbbell } from '@fortawesome/pro-solid-svg-icons';
import RoundIconButton from '../RoundIconButton';
import ListItem from '../ListItem';
import styles from './styles';

const WorkoutList = () => {
	const [workouts, setWorkouts] = useState([]);

	useEffect(() => {
		console.log('getting workouts...');
		const unsubscribe = firebase
			.firestore()
			.collection('workouts')
			.onSnapshot((snapshot) => {
				const allWorkouts = snapshot.docs.map((doc) => ({
					id: doc.id,
					...doc.data(),
				}));
				console.log('worokut list - allWorkouts: ', allWorkouts);
				setWorkouts(allWorkouts);
			});
		return () => unsubscribe();
	}, []);

	return (
		<div className="container workoutList">
			<h1>Select workout</h1>
			<p>Lorem ipsum dolor sit amet consecetur</p>

			{workouts.map((workout) => (
				<ListItem key={workout.id}>
					<Link to={`/workouts/${workout.id}`} key={workout.id} className="workoutLink">
						{workout.name}

						<RoundIconButton>
							<FontAwesomeIcon icon={faDumbbell} />
						</RoundIconButton>
					</Link>
				</ListItem>
			))}
			<style jsx>{styles}</style>
		</div>
	);
};

export default WorkoutList;
