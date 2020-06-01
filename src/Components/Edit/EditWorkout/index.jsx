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
// import FormInput from '../../Form/FormInput';
// import FormButton from '../../Form/FormButton';
import WorkoutForm from '../../WorkoutForm';
import Card from '../../SortableCardList/Card';

const EditWorkout = ({ match }) => {
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

	// const handleInputChange = (event) => {
	// 	const { value } = event.target;
	// 	setWorkoutName(value);
	// };

	const inputChange = (event, index, repIndex) => {
		const { name, value, type } = event.target;

		if (name === 'workoutName') {
			setWorkoutName(value);
		} else {
			const updatedState = [...exercises];
			if (name === 'reps') {
				updatedState[index].reps[repIndex] = parseFloat(value);
			} else if (type === 'number') {
				updatedState[index][name] = parseFloat(value);
			} else {
				updatedState[index][name] = value;
			}
			setExercises(updatedState);
		}
	};

	const addExercise = () => {
		setExercises([
			...exercises,
			{
				name: '',
				weight: 0,
				sets: 0,
				reps: [0],
			},
		]);
	};

	const removeExercise = (index) => {
		if (exercises.length > 1) {
			const updatedState = [...exercises];
			updatedState.splice(index, 1);
			setExercises(updatedState);
		}
	};

	const addRep = (event, index) => {
		event.preventDefault();
		const updatedState = [...exercises];
		console.log('index: ', index);
		updatedState[index].reps.push(0);
		setExercises(updatedState);
	};

	const removeRep = (event, index, repIndex) => {
		event.preventDefault();
		if (exercises[index].reps.length > 1) {
			const updatedState = [...exercises];
			updatedState[index].reps.splice(repIndex, 1);
			setExercises(updatedState);
		}
	};

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
				showNotification('success', 'Workout updated!');
			})
			.catch(() => {
				showNotification('error', "Oh no, there's been a problem!");
			});
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

	const onCancel = () => {
		history.goBack();
	};

	return (
		<>
			{!isLoaded && <LoadingSpinner />}
			<Notification notificationList={notificationList} />

			<div className="container">
				<h1>Edit workout</h1>
				<p>Edit an workout using the form below. Drag and drop the exercise blocks to change the exercise order.</p>
				{isLoaded && (
					<>
						<WorkoutForm type="edit" workoutName={workoutName} exercises={exercises} onSubmit={onSubmit} onCancel={onCancel} inputChange={inputChange} addExercise={addExercise} removeExercise={removeExercise} addRep={addRep} removeRep={removeRep} />

						{/* <form onSubmit={onSubmit}>

							<FormInput label="Workout name" type="text" name="name" value={workoutName} placeholder="Enter workout name.." onChange={(event) => handleInputChange(event)} textAlign="center" required />

							<h2>Change exercise order</h2>

							<DndProvider backend={MultiBackend} options={HTML5toTouch}>
								{exerciseList.map((exercise, i) => (
									<Card key={exercise.id} index={i} id={exercise.id} text={exercise.name} moveCard={moveCard} />
								))}
							</DndProvider>

							<FormButton type="submit" label="Update" />
							<FormButton type="button" label="Cancel" onClick={() => handleCancel()} />
						</form> */}
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
