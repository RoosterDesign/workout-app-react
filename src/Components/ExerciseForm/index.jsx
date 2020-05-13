import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faTrash } from '@fortawesome/pro-solid-svg-icons';
import FormSelect from '../Form/FormSelect';
import FormInput from '../Form/FormInput';
import FormButton from '../Form/FormButton';
import RoundIconButton from '../RoundIconButton';
import styles from './styles';

const ExerciseForm = ({ type, exercise, options, onSubmit, handleInputChange, handleAddRepsField, handleRemoveRepsField, handleCancel, resetForm }) => {
	console.log('exercise: ', exercise);
	const { workoutId, name, reps, sets, weight } = exercise;
	console.info('sets: ', typeof sets, sets);
	return (
		<form onSubmit={onSubmit}>
			<FormSelect label="Select Workout" name="workoutId" value={workoutId} defaultOption="Select workout..." options={options} onChange={(event) => handleInputChange(event)} required />

			<FormInput label="Exercise name" type="text" name="name" value={name} placeholder="Enter exercise name.." onChange={(event) => handleInputChange(event)} required />

			<FormInput label="Weight (kg)" type="number" name="weight" value={weight !== 0 ? weight : ''} placeholder="Enter weight in kg.." onChange={(event) => handleInputChange(event)} step="0.25" required />

			<FormInput label="Sets" type="number" name="sets" value={sets !== 0 ? sets : ''} placeholder="Enter number of sets.." onChange={(event) => handleInputChange(event)} required />

			{reps.map((rep, index) => (
				<div key={index} className="repsContainer">
					{reps.length > 1 && (
						<div className="deleteRepBtn">
							<RoundIconButton type="button" onClick={() => handleRemoveRepsField(index)}>
								<FontAwesomeIcon icon={faTrash} />
							</RoundIconButton>
						</div>
					)}
					<FormInput label="Rep" type="number" name="reps" value={rep !== 0 ? rep : ''} placeholder="Enter number of reps.." onChange={(event) => handleInputChange(event, index)} required />
				</div>
			))}
			<button type="button" onClick={() => handleAddRepsField()} className="addRepsBtn">
				<FontAwesomeIcon icon={faPlus} /> Add additional reps
			</button>

			{type === 'add' && (
				<>
					<FormButton type="submit" label="Add Exercise" />
					<FormButton type="button" label="Reset" onClick={() => resetForm()} />
				</>
			)}

			{type === 'edit' && (
				<>
					<FormButton type="submit" label="Update" />
					<FormButton type="button" label="Cancel" onClick={() => handleCancel()} />
				</>
			)}

			<style jsx>{styles}</style>
		</form>
	);
};

export default ExerciseForm;

ExerciseForm.propTypes = {
	type: PropTypes.string.isRequired,
	exercise: PropTypes.shape({
		workoutId: PropTypes.string.isRequired,
		name: PropTypes.string.isRequired,
		reps: PropTypes.array.isRequired,
		sets: PropTypes.number.isRequired,
		weight: PropTypes.number.isRequired,
	}),
	options: PropTypes.array.isRequired,
	onSubmit: PropTypes.func.isRequired,
	handleInputChange: PropTypes.func.isRequired,
	handleAddRepsField: PropTypes.func.isRequired,
	handleRemoveRepsField: PropTypes.func.isRequired,
	handleCancel: PropTypes.func,
	resetForm: PropTypes.func,
};
