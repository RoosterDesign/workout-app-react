import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../Auth';
import firebase from '../../config/firebase';
import LoadingSpinner from '../LoadingSpinner';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDumbbell } from '@fortawesome/pro-solid-svg-icons';
import RoundIconButton from '../RoundIconButton';
import ListItem from '../ListItem';
import styles from './styles';

const WorkoutList = () => {
	const { currentUser } = useContext(AuthContext);
	const [isLoaded, setIsLoaded] = useState(false);
	const [workouts, setWorkouts] = useState([]);

	useEffect(() => {
		const unsubscribe = firebase.db
			.collection('workouts')
			.where('uid', '==', currentUser.uid)
			.onSnapshot((snapshot) => {
				const allWorkouts = snapshot.docs.map((doc) => ({
					id: doc.id,
					...doc.data(),
				}));
				setWorkouts(allWorkouts);
				setIsLoaded(true);
			});
		return () => unsubscribe();
	}, [currentUser.uid]);

	return (
		<>
			{!isLoaded && <LoadingSpinner />}
			<div className="container workoutList">
				<h1>Select workout</h1>
				<p>Select a workout from below.</p>
				{isLoaded && (
					<>
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
					</>
				)}
				<style jsx>{styles}</style>
			</div>
		</>
	);
};

export default WorkoutList;
