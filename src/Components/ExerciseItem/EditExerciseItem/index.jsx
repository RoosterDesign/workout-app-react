import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faTrash, faTimes } from '@fortawesome/pro-solid-svg-icons';
import RoundIconButton from '../../RoundIconButton';
import FormInput from '../../Form/FormInput';
import classNames from 'classnames';
import styles from './styles';

const EditExerciseItem = ({ exerciseLength, exercise, index, confirmDelete, inputChange, removeRep, addRep, handleEdit }) => {
	const { name, weight, sets, reps, isEditMode } = exercise;
	return (
		<div className="exercise">
			<div className="cancelEdit">
				<RoundIconButton type="button" onClick={(e) => handleEdit(e, index)}>
					<FontAwesomeIcon icon={faTimes} />
				</RoundIconButton>
			</div>

			<div className="full">
				<FormInput label="Exercise name" type="text" name="name" value={name} placeholder="Exercise name..." onChange={(event) => inputChange(event, index)} required />
			</div>
			<div className="half">
				<FormInput label="Weight (kg)" type="number" name="weight" value={weight !== 0 ? weight : ''} placeholder="Weight..." onChange={(event) => inputChange(event, index)} step="0.25" required />
			</div>
			<div className="half">
				<FormInput label="Sets" type="number" name="sets" value={sets !== 0 ? sets : ''} placeholder="Sets..." onChange={(event) => inputChange(event, index)} required />
			</div>
			{reps.map((rep, repIndex) => (
				<div
					key={repIndex}
					className={classNames({
						repsContainer: true,
						full: reps.length === 1,
						half: reps.length > 1,
					})}
				>
					{reps.length > 1 && (
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

			<style jsx>{styles}</style>
		</div>
	);
};

export default EditExerciseItem;

// EditExerciseItem.propTypes = {
// 	exercise: PropTypes.object.isRequired,
// 	index: PropTypes.number.isRequired,
// 	confirmDelete: PropTypes.func,
// 	inputChange: PropTypes.func.isRequired,
// 	removeRep: PropTypes.func.isRequired,
// 	addRep: PropTypes.func.isRequired,
// };
