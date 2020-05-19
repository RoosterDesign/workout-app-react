import React, { useState, useEffect, useCallback } from 'react';
import update from 'immutability-helper';
import PropTypes from 'prop-types';
import { DndProvider } from 'react-dnd';
import Backend from 'react-dnd-html5-backend';
import { useHistory } from 'react-router-dom';
import firebase from 'firebase';
import LoadingSpinner from '../../LoadingSpinner';
import Notification from '../../Notification';
import FormInput from '../../Form/FormInput';
import FormButton from '../../Form/FormButton';
import Card from '../../SortableCardList/Card';

const EditWorkout = ({ match }) => {
	const initialState = {
		workoutId: '',
		name: '',
		sets: '',
		reps: [''],
		weight: '',
	};

	const [isLoaded, setIsLoaded] = useState(false);
	const [notificationList, setNotificationList] = useState([]);
	const [workout, setWorkout] = useState({ name: '' });
	const [exercises, setExercises] = useState(initialState);
	const history = useHistory();

	useEffect(() => {
		const unsbuscribeWorkouts = firebase
			.firestore()
			.collection('workouts')
			.doc(match.params.id)
			.onSnapshot((snapshot) => {
				const workout = snapshot.data();
				setWorkout({ name: workout.name });
			});

		const unsbuscribeExercises = firebase
			.firestore()
			.collection('exercises')
			.where('workoutId', '==', match.params.id)
			.orderBy('order')
			.onSnapshot((snapshot) => {
				const allExercises = snapshot.docs.map((doc) => ({
					id: doc.id,
					...doc.data(),
				}));
				setExercises(allExercises);
				setIsLoaded(true);
			});

		return () => {
			unsbuscribeWorkouts();
			unsbuscribeExercises();
		};
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
		const { name, value } = event.target;
		setWorkout({ [name]: value });
	};

	const onSubmit = (e) => {
		e.preventDefault();

		// resetScore(): Promise<void> {
		// 	return this.usersCollectionRef.ref.get().then(resp => {
		// 		console.log(resp.docs)
		// 		let batch = this.afs.firestore.batch();

		// 		resp.docs.forEach(userDocRef => {
		// 			batch.update(userDocRef.ref, {'score': 0, 'leadsWithSalesWin': 0, 'leadsReported': 0});
		// 		})
		// 		batch.commit().catch(err => console.error(err));
		// 	}).catch(error => console.error(error))
		// }

		firebase
			.firestore()
			.collection('workouts')
			.doc(match.params.id)
			.set({
				name: workout.name,
			})
			.then(() => {
				showNotification('success', 'Workout updated!');
			})
			.catch(() => {
				showNotification('error', "Oh no, there's been a problem!");
			});
	};

	const handleCancel = () => {
		history.goBack();
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

	const dropCard = useCallback(() => {
		const updatedState = [...exercises];
		for (let i = 0; i < updatedState.length; i++) {
			updatedState[i].order = i;
		}
		setExercises([...updatedState]);
	}, [exercises]);

	return (
		<>
			{console.log('exercises: ', exercises)}
			{!isLoaded && <LoadingSpinner />}
			<Notification notificationList={notificationList} />

			<div className="container">
				<h1>Edit workout</h1>
				<p>Edit an workout using the form below.</p>

				{isLoaded && (
					<>
						<form onSubmit={onSubmit}>
							<FormInput label="Workout name" type="text" name="name" value={workout.name} placeholder="Enter workout name.." onChange={(event) => handleInputChange(event)} textAlign="center" required />

							<h2>Change exercise order</h2>

							{/* {exercises.map((exercise, index) => (
								<ExerciseNameItem key={index} name={exercise.name} />
							))} */}

							<DndProvider backend={Backend}>
								{/* <SortableCardList data={exercises} dropCard={dropCard} /> */}
								{/* <div>{cards.map((card, i) => renderCard(card, i))}</div> */}

								{exercises.map((exercise, i) => (
									<Card key={exercise.id} index={i} id={exercise.id} text={exercise.name} moveCard={moveCard} dropCard={dropCard} />
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
