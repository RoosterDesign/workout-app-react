import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/pro-solid-svg-icons';
import ExerciseForm from '../ExerciseForm';
import FormInput from '../Form/FormInput';
import FormButton from '../Form/FormButton';
import styles from './styles';

const WorkoutForm = ({ type, workoutName, exercises, onSubmit, onReset, onCancel, inputChange, addExercise, confirmDelete, addRep, removeRep }) => {
	return (
		<form onSubmit={onSubmit}>
			<FormInput label="Workout name" type="text" name="workoutName" value={workoutName} placeholder="Enter workout name.." onChange={(event) => inputChange(event)} textAlign="center" required />

			{exercises.map((exercise, index) => (
				<ExerciseForm key={index} index={index} exerciseLength={exercises.length} exercise={exercise} confirmDelete={confirmDelete} inputChange={inputChange} removeRep={removeRep} addRep={addRep} />
			))}

			<button type="button" onClick={() => addExercise()} className="addExercise">
				<FontAwesomeIcon icon={faPlus} /> Add exercise
			</button>

			{type === 'add' && (
				<div className="btnContainer">
					<FormButton type="submit" label="Save" />
					<FormButton type="button" label="Reset" onClick={() => onReset()} />
				</div>
			)}

			{type === 'edit' && (
				<div className="btnContainer">
					<FormButton type="submit" label="Update" />
					<FormButton type="button" label="Cancel" onClick={() => onCancel()} />
				</div>
			)}

			<style jsx>{styles}</style>
		</form>
	);
};

export default WorkoutForm;

WorkoutForm.propTypes = {
	type: PropTypes.string.isRequired,
	workoutName: PropTypes.string.isRequired,
	exercises: PropTypes.arrayOf(
		PropTypes.shape({
			name: PropTypes.string.isRequired,
			order: PropTypes.number,
			weight: PropTypes.number.isRequired,
			sets: PropTypes.number.isRequired,
			reps: PropTypes.array.isRequired,
		})
	),
	onSubmit: PropTypes.func.isRequired,
	inputChange: PropTypes.func.isRequired,
	addExercise: PropTypes.func.isRequired,
	confirmDelete: PropTypes.func.isRequired,
	addRep: PropTypes.func.isRequired,
	removeRep: PropTypes.func.isRequired,
	onReset: PropTypes.func,
	onCancel: PropTypes.func,
};
