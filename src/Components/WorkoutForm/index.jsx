import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faTrash } from '@fortawesome/pro-solid-svg-icons';
import classNames from 'classnames';
import FormInput from '../Form/FormInput';
import FormButton from '../Form/FormButton';
import RoundIconButton from '../RoundIconButton';
import styles from './styles';

const WorkoutForm = ({ type, workoutName, exercises, onSubmit, onReset, onCancel, inputChange, addExercise, removeExercise, addRep, removeRep }) => {
	return (
		<form onSubmit={onSubmit}>
			<FormInput label="Workout name" type="text" name="workoutName" value={workoutName} placeholder="Enter workout name.." onChange={(event) => inputChange(event)} textAlign="center" required />

			{exercises.map((exercise, index) => (
				<div key={index} className="exercise">
					{exercises.length > 1 && (
						<div className="deleteBtn">
							<RoundIconButton type="button" onClick={() => removeExercise(index)}>
								<FontAwesomeIcon icon={faTrash} />
							</RoundIconButton>
						</div>
					)}
					<div className="full">
						<FormInput label="Exercise name" type="text" name="name" value={exercise.name} placeholder="Exercise name..." onChange={(event) => inputChange(event, index)} required />
					</div>
					<div className="half">
						<FormInput label="Weight (kg)" type="number" name="weight" value={exercise.weight !== 0 ? exercise.weight : ''} placeholder="Weight..." onChange={(event) => inputChange(event, index)} step="0.25" required />
					</div>
					<div className="half">
						<FormInput label="Sets" type="number" name="sets" value={exercise.sets !== 0 ? exercise.sets : ''} placeholder="Sets..." onChange={(event) => inputChange(event, index)} required />
					</div>

					{exercise.reps.map((rep, repIndex) => (
						<div
							key={repIndex}
							className={classNames({
								repsContainer: true,
								half: exercise.reps.length > 1,
							})}
						>
							{exercise.reps.length > 1 && (
								<div className="deleteRep">
									<RoundIconButton type="button" onClick={(event) => removeRep(event, index, repIndex)}>
										<FontAwesomeIcon icon={faTrash} />
									</RoundIconButton>
								</div>
							)}
							<FormInput label="Rep" type="number" name="reps" value={rep !== 0 ? rep : ''} placeholder="Reps..." onChange={(event) => inputChange(event, index, repIndex)} required />
						</div>
					))}
					<button type="button" onClick={(event) => addRep(event, index)} className="addRep">
						<FontAwesomeIcon icon={faPlus} /> Add Rep
					</button>
				</div>
			))}

			<button type="button" onClick={() => addExercise()} className="addExercise">
				<FontAwesomeIcon icon={faPlus} /> Add exercise
			</button>

			{type === 'add' && (
				<>
					<FormButton type="submit" label="Save" />
					<FormButton type="button" label="Reset" onClick={() => onReset()} />
				</>
			)}

			{type === 'edit' && (
				<>
					<FormButton type="submit" label="Update" />
					<FormButton type="button" label="Cancel" onClick={() => onCancel()} />
				</>
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
	removeExercise: PropTypes.func.isRequired,
	addRep: PropTypes.func.isRequired,
	removeRep: PropTypes.func.isRequired,
	onReset: PropTypes.func,
	onCancel: PropTypes.func,
};
