import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styles from './styles';
import ExerciseItem from '../ExerciseItem';

const ExerciseList = ({ exerciseList }) => {
	const updatedExercises = exerciseList.map((exercise, index) => ({ ...exercise, id: index, isCompleted: false, isActive: false, isEditMode: false }));
	const [exercises, setExercises] = useState(updatedExercises);

	const handleClick = (index) => {
		const newArr = [...exercises];
		newArr.forEach((el) => {
			el.isActive = false;
			el.isEditMode = false;
		});
		newArr[index].isActive = !newArr[index].isActive;
		setExercises(newArr);
	};

	const handleCompleted = (e, index) => {
		e.stopPropagation();
		const newArr = [...exercises];
		newArr[index].isCompleted = !newArr[index].isCompleted;
		setExercises(newArr);
	};

	const handleEdit = (e, index) => {
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

	return (
		<>
			{console.log(exercises)}
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
				<ExerciseItem key={index} exercise={exercise} index={index} handleClick={handleClick} handleCompleted={handleCompleted} handleEdit={handleEdit} inputChange={inputChange} removeRep={removeRep} addRep={addRep} />
			))}

			<style jsx>{styles}</style>
		</>
	);
};

export default ExerciseList;

ExerciseList.propTypes = {
	exerciseList: PropTypes.array.isRequired,
};
