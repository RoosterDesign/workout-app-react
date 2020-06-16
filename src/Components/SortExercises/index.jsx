import React, { useState, useEffect, useCallback } from 'react';
import update from 'immutability-helper';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import firebase from 'firebase';
import { DndProvider } from 'react-dnd-multi-backend';
import MultiBackend from 'react-dnd-multi-backend';
import HTML5toTouch from 'react-dnd-multi-backend/dist/esm/HTML5toTouch';
import SortableExerciseCard from '../SortableExerciseCard';
import LoadingSpinner from '../LoadingSpinner';
import FormButton from '../Form/FormButton';
import Notification from '../Notification';
import styles from './styles';

const SortExercises = ({ match }) => {
	const [isLoaded, setIsLoaded] = useState(false);
	const [notificationList, setNotificationList] = useState([]);
	const [workoutName, setWorkoutName] = useState('');
	const [exercises, setExercises] = useState([]);
	const history = useHistory();

	useEffect(() => {
		console.log('match id: ', match.params.id);
		const unsubscribe = firebase
			.firestore()
			.collection('workouts')
			.doc(match.params.id)
			.onSnapshot((snapshot) => {
				const workout = snapshot.data();
				console.log('workout: ', workout);
				setWorkoutName(workout.name);
				setExercises(workout.exercises);
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

	const moveCard = useCallback(
		(dragIndex, hoverIndex) => {
			const dragCard = exercises[dragIndex];
			setExercises(
				update(exercises, {
					$splice: [
						[dragIndex, 1],
						[hoverIndex, 0, dragCard],
					],
				})
			);
		},
		[exercises]
	);

	const onSubmit = (e) => {
		e.preventDefault();
		firebase
			.firestore()
			.collection('workouts')
			.doc(match.params.id)
			.set({
				name: workoutName,
				exercises: exercises,
			})
			.then(() => {
				showNotification('success', 'Sort order updated!');
			})
			.catch(() => {
				showNotification('error', "Oh no, there's been a problem!");
			});
	};

	const onCancel = () => {
		history.goBack();
	};

	return (
		<>
			{!isLoaded && <LoadingSpinner />}
			<Notification notificationList={notificationList} />

			<div className="container">
				<h1>Change Order</h1>
				<p>Drag and drop the order of exercises.</p>

				{isLoaded && (
					<form onSubmit={onSubmit}>
						<div className="exercisesWrap">
							<div className="label">{workoutName}</div>
							<DndProvider backend={MultiBackend} options={HTML5toTouch}>
								{exercises.map((exercise, index) => (
									<SortableExerciseCard key={exercise.name} index={index} id={exercise.name} name={exercise.name} moveCard={moveCard} />
								))}
							</DndProvider>
						</div>
						<div className="btnContainer">
							<FormButton type="submit" label="Save" />
							<FormButton type="button" label="Cancel" onClick={() => onCancel()} />
						</div>
					</form>
				)}
			</div>

			<style jsx>{styles}</style>
		</>
	);
};

export default SortExercises;

SortExercises.propTypes = {
	match: PropTypes.object.isRequired,
};
