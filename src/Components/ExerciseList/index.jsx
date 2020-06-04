import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styles from './styles';
import ExerciseItem from '../ExerciseItem';

const ExerciseList = ({ exerciseList }) => {
	const updatedExercises = exerciseList.map((exercise, index) => ({ ...exercise, id: index, isCompleted: false }));

	const [currentExercise, setCurrentExercise] = useState({});
	const [exercises, setExercises] = useState(updatedExercises);

	const handleClick = (id) => {
		const currentExerciseObj = exercises.find((el) => {
			return el.id === id;
		});
		if (!currentExerciseObj.isCompleted) {
			setCurrentExercise(currentExercise.id !== id ? currentExerciseObj : {});
		}
	};

	const handleCompleted = (e, index) => {
		e.stopPropagation();
		const newArr = [...exercises];
		newArr[index].isCompleted = !newArr[index].isCompleted;
		setExercises(newArr);
		setCurrentExercise({});
	};

	return (
		<>
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
				<ExerciseItem key={index} id={exercise.id} exercise={exercise} currentExerciseId={currentExercise.id} index={index} handleClick={handleClick} handleCompleted={handleCompleted} />
			))}

			<style jsx>{styles}</style>
		</>
	);
};

export default ExerciseList;

ExerciseList.propTypes = {
	exerciseList: PropTypes.array.isRequired,
};
