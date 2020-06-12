import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faPencil, faTimes } from '@fortawesome/pro-solid-svg-icons';
import classNames from 'classnames';
import RoundIconButton from '../RoundIconButton';
import EditExerciseItem from './EditExerciseItem';
import ReadOnlyExerciseItem from './ReadOnlyExerciseItem';
import styles from './styles';

const ExerciseItem = ({ exercise, editMode, index, handleClick, handleCompleted, handleEdit, inputChange, removeRep, addRep, updateExercise, cancelEdit }) => {
	if (exercise.isEditMode) {
		return <EditExerciseItem isInline key={index} index={index} exercise={exercise} inputChange={inputChange} removeRep={removeRep} addRep={addRep} isEditMode={exercise.isEditMode} handleEdit={handleEdit} updateExercise={updateExercise} cancelEdit={cancelEdit} />;
	} else {
		return <ReadOnlyExerciseItem exercise={exercise} editMode={editMode} index={index} handleCompleted={handleCompleted} handleClick={handleClick} handleEdit={handleEdit} />;
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
