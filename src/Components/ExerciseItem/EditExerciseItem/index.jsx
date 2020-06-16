import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faTrash, faTimes } from '@fortawesome/pro-solid-svg-icons';
import RoundIconButton from '../../RoundIconButton';
import FormInput from '../../Form/FormInput';
import classNames from 'classnames';
import styles from './styles';

const EditExerciseItem = ({ exercise, index, inputChange, removeRep, addRep, cancelEdit, updateExercise }) => {
	const { name, weight, sets, reps } = exercise;
	return (
		<form className="exercise" onSubmit={(e) => updateExercise(e, index)}>
			<div className="cancelEdit">
				<RoundIconButton type="button" onClick={(e) => cancelEdit(e, index)}>
					<FontAwesomeIcon icon={faTimes} />
				</RoundIconButton>
			</div>

			<div className="exerciseName">
				<FormInput label="Exercise name" type="text" name="name" value={name} placeholder="Exercise name..." onChange={(event) => inputChange(event, index)} required />
			</div>
			<div className="weight">
				<FormInput label="Weight (kg)" type="number" name="weight" value={weight !== 0 ? weight : ''} placeholder="Weight..." onChange={(event) => inputChange(event, index)} step="0.25" required />
			</div>
			<div className="sets">
				<FormInput label="Sets" type="number" name="sets" value={sets !== 0 ? sets : ''} placeholder="Sets..." onChange={(event) => inputChange(event, index)} required />
			</div>
			{reps.map((rep, repIndex) => (
				<div
					key={repIndex}
					className={classNames({
						repsContainer: true,
						repSingular: reps.length === 1,
						reps: reps.length > 1,
					})}
				>
					{reps.length > 1 && (
						<div className="deleteRep">
							<RoundIconButton type="button" onClick={(e) => removeRep(e, index, repIndex)}>
								<FontAwesomeIcon icon={faTrash} />
							</RoundIconButton>
						</div>
					)}
					<FormInput label="Rep" type="number" name="reps" value={rep !== 0 ? rep : ''} placeholder="Reps..." onChange={(event) => inputChange(event, index, repIndex)} required />
				</div>
			))}

			<div className="flexClear"></div>
			<button type="button" onClick={(event) => addRep(event, index)} className="addRep">
				<FontAwesomeIcon icon={faPlus} /> Add Rep
			</button>

			<div className="flexClear"></div>
			<button type="submit" className="update">
				Update
			</button>

			<style jsx>{styles}</style>
		</form>
	);
};

export default EditExerciseItem;

EditExerciseItem.propTypes = {
	exercise: PropTypes.shape({
		name: PropTypes.string.isRequired,
		weight: PropTypes.number.isRequired,
		sets: PropTypes.number.isRequired,
		reps: PropTypes.array.isRequired,
	}),
	index: PropTypes.number.isRequired,
	confirmDelete: PropTypes.func,
	inputChange: PropTypes.func.isRequired,
	removeRep: PropTypes.func.isRequired,
	addRep: PropTypes.func.isRequired,
	cancelEdit: PropTypes.func.isRequired,
	updateExercise: PropTypes.func.isRequired,
};
