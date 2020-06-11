import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faPencil, faTimes } from '@fortawesome/pro-solid-svg-icons';
import classNames from 'classnames';
import RoundIconButton from '../RoundIconButton';
import EditExerciseItem from './EditExerciseItem';
import ReadOnlyExerciseItem from './ReadOnlyExerciseItem';
import styles from './styles';

const ExerciseItem = ({ exercise, index, handleClick, handleCompleted, handleEdit, inputChange, removeRep, addRep }) => {
	// const { name, reps, sets, weight, isCompleted, isActive, isEditMode } = exercise;

	if (exercise.isEditMode) {
		return <EditExerciseItem isInline key={index} index={index} exercise={exercise} inputChange={inputChange} removeRep={removeRep} addRep={addRep} isEditMode={exercise.isEditMode} handleEdit={handleEdit} />;
	} else {
		return <ReadOnlyExerciseItem exercise={exercise} index={index} handleClick={handleClick} handleEdit={handleEdit} />;
	}
};

export default ExerciseItem;

// ExerciseItem.propTypes = {
// 	exercise: PropTypes.shape({
// 		name: PropTypes.string.isRequired,
// 		reps: PropTypes.array.isRequired,
// 		sets: PropTypes.number.isRequired,
// 		weight: PropTypes.number.isRequired,
// 		isCompleted: PropTypes.bool.isRequired,
// 		isActive: PropTypes.bool.isRequired,
// 		isEditMode: PropTypes.bool.isRequired,
// 	}),
// 	index: PropTypes.number.isRequired,
// 	handleClick: PropTypes.func.isRequired,
// 	handleCompleted: PropTypes.func.isRequired,
// 	handleEdit: PropTypes.func.isRequired,
// };
