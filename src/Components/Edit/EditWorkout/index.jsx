import React, { useState, useEffect, useCallback } from 'react';
import update from 'immutability-helper';
import PropTypes from 'prop-types';
import { DndProvider } from 'react-dnd-multi-backend';
import MultiBackend from 'react-dnd-multi-backend';
import HTML5toTouch from 'react-dnd-multi-backend/dist/esm/HTML5toTouch';
import { useHistory } from 'react-router-dom';
import firebase from 'firebase';
import LoadingSpinner from '../../LoadingSpinner';
import Notification from '../../Notification';
import FormInput from '../../Form/FormInput';
import FormButton from '../../Form/FormButton';
import Card from '../../SortableCardList/Card';

const EditWorkout = ({ match }) => {
	const [isLoaded, setIsLoaded] = useState(false);
	const [notificationList, setNotificationList] = useState([]);
	const [workoutName, setWorkoutName] = useState('');
	const [exerciseList, setExerciseList] = useState([]);
	const history = useHistory();

	useEffect(() => {
		const unsubscribe = firebase
			.firestore()
			.collection('workouts')
			.doc(match.params.id)
			.onSnapshot((snapshot) => {
				const workout = snapshot.data();
				setWorkoutName(workout.name);
				setExerciseList(workout.exercises);
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

	const handleInputChange = (event) => {
		const { value } = event.target;
		setWorkoutName(value);
	};

	const onSubmit = (e) => {
		e.preventDefault();
		firebase
			.firestore()
			.collection('workouts')
			.doc(match.params.id)
			.set({
				name: workoutName,
				exercises: exerciseList,
			})
			.then(() => {
				showNotification('success', 'Workout updated!');
			})
			.catch(() => {
				showNotification('error', "Oh no, there's been a problem!");
			});
	};

	const moveCard = useCallback(
		(dragIndex, hoverIndex) => {
			const dragCard = exerciseList[dragIndex];
			setExerciseList(
				update(exerciseList, {
					$splice: [
						[dragIndex, 1],
						[hoverIndex, 0, dragCard],
					],
				})
			);
		},
		[exerciseList]
	);

	const handleCancel = () => {
		history.goBack();
	};

	return (
		<>
			{!isLoaded && <LoadingSpinner />}
			<Notification notificationList={notificationList} />

			<div className="container">
				<h1>Edit workout</h1>
				<p>Edit an workout using the form below.</p>

				{isLoaded && (
					<>
						<form onSubmit={onSubmit}>
							<FormInput label="Workout name" type="text" name="name" value={workoutName} placeholder="Enter workout name.." onChange={(event) => handleInputChange(event)} textAlign="center" required />

							<h2>Change exercise order</h2>

							<DndProvider backend={MultiBackend} options={HTML5toTouch}>
								{exerciseList.map((exercise, i) => (
									<Card key={exercise.id} index={i} id={exercise.id} text={exercise.name} moveCard={moveCard} />
								))}
							</DndProvider>

							<FormButton type="submit" label="Update" />
							<FormButton type="button" label="Cancel" onClick={() => handleCancel()} />
						</form>
					</>
				)}
			</div>
		</>
	);
};

export default EditWorkout;

EditWorkout.propTypes = {
	match: PropTypes.object.isRequired,
};
