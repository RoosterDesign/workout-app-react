import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styles from './styles';
import ExerciseItem from '../ExerciseItem';
import firebase from 'firebase';
import Notification from '../Notification';

const ExerciseList = ({ workoutId, exerciseList }) => {
	const updatedExercises = exerciseList.map((exercise, index) => ({ ...exercise, id: index, isCompleted: false, isActive: false, isEditMode: false }));

	const initialState = updatedExercises;

	const [editMode, setEditMode] = useState(false);
	const [exercises, setExercises] = useState(updatedExercises);
	const [notificationList, setNotificationList] = useState([]);

	const showNotification = (type, message) => {
		const id = Math.floor(Math.random() * 100 + 1);
		const notificationProperties = {
			id,
			type,
			message,
		};
		setNotificationList([...notificationList, notificationProperties]);
	};

	const handleClick = (index) => {
		//setExercises(initialState);
		const newArr = [...exercises];
		if (!newArr[index].isCompleted && !editMode) {
			newArr.forEach((el) => {
				el.isActive = false;
				el.isEditMode = false;
			});
			newArr[index].isActive = !newArr[index].isActive;
			setExercises(newArr);
		}
	};

	const handleCompleted = (e, index) => {
		e.stopPropagation();
		const newArr = [...exercises];
		newArr[index].isActive = false;
		newArr[index].isCompleted = !newArr[index].isCompleted;
		setExercises(newArr);
	};

	const handleEdit = (e, index) => {
		setEditMode(true);
		e.stopPropagation();
		const newArr = [...exercises];
		newArr[index].isActive = false;
		newArr[index].isEditMode = !newArr[index].isEditMode;
		setExercises(newArr);
	};

	const inputChange = (event, index, repIndex) => {
		const { name, value, type } = event.target;
		const updatedState = [...exercises];
		if (name === 'reps') {
			updatedState[index].reps[repIndex] = parseFloat(value);
		} else if (type === 'number') {
			updatedState[index][name] = parseFloat(value);
		} else {
			updatedState[index][name] = value;
		}
		setExercises(updatedState);
	};

	const addRep = (event, index) => {
		event.preventDefault();
		const updatedState = [...exercises];
		updatedState[index].reps.push(0);
		setExercises(updatedState);
	};

	const removeRep = (e, index, repIndex) => {
		e.preventDefault();
		if (exercises[index].reps.length > 1) {
			const updatedState = [...exercises];
			updatedState[index].reps.splice(repIndex, 1);
			setExercises(updatedState);
		}
	};

	const updateExercise = (e, index) => {
		e.preventDefault();
		firebase
			.firestore()
			.collection('workouts')
			.doc(workoutId)
			.update({
				exercises,
			})
			.then(() => {
				showNotification('success', 'Exercise updated!');
				const newArr = [...exercises];
				newArr[index].isEditMode = false;
				newArr[index].isActive = !newArr[index].isActive;
				setExercises(newArr);
				setEditMode(false);
			})
			.catch(() => {
				showNotification('error', "Oh no, there's been a problem!");
			});
	};

	const cancelEdit = (e) => {
		e.preventDefault();
		console.info('initialState: ', initialState);
		setExercises(initialState);
		setEditMode(false);
	};

	return (
		<>
			<Notification notificationList={notificationList} />

			{console.log('edit mode: ', editMode)}

			{/* <div>
				<p>
					Selected Exercise: {currentExercise.name}
					<br />
					Selected Sets: {currentExercise.sets}
					<br />
					Selected Reps: {currentExercise.reps}
					<br />
					Selected Weight: {currentExercise.weight}
				</p>
			</div> */}

			{exercises.map((exercise, index) => (
				<ExerciseItem key={index} exercise={exercise} editMode={editMode} index={index} handleClick={handleClick} handleCompleted={handleCompleted} handleEdit={handleEdit} inputChange={inputChange} removeRep={removeRep} addRep={addRep} updateExercise={updateExercise} cancelEdit={cancelEdit} />
			))}

			<style jsx>{styles}</style>
		</>
	);
};

export default ExerciseList;

ExerciseList.propTypes = {
	exerciseList: PropTypes.array.isRequired,
};
