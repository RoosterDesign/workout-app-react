import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencil } from '@fortawesome/pro-solid-svg-icons';
import RoundIconButton from '../../RoundIconButton';
import classNames from 'classnames';
import styles from './styles';

const ReadOnlyExerciseItem = ({ exercise, index, handleClick, handleEdit }) => {
	const { name, weight, sets, reps, isEditMode, isActive, isCompleted } = exercise;
	return (
		<div
			className={classNames({
				exercise: true,
				isActive: isActive,
				isCompleted: isCompleted,
			})}
			onClick={() => handleClick(index)}
		>
			{isActive && !isCompleted && (
				<div className="edit">
					<RoundIconButton type="button" onClick={(e) => handleEdit(e, index)}>
						<FontAwesomeIcon icon={faPencil} />
					</RoundIconButton>
				</div>
			)}

			{isEditMode ? (
				<ExerciseForm key={index} index={index} exercise={exercise} inputChange={inputChange} removeRep={removeRep} addRep={addRep} />
			) : (
				<>
					<div className="name">
						<span className="label">Name</span>

						{isEditMode ? 'edit name' : name}
					</div>

					<div className="sets">
						<span className="label">Sets</span>
						{sets}
					</div>

					<div
						className={classNames({
							reps: true,
							small: reps.length > 2,
						})}
					>
						<span className="label">Reps</span>
						{reps.map((rep, i) => (
							<span key={i}>
								{rep}
								{i + 1 < reps.length && ','}
							</span>
						))}
					</div>

					<div className="weight">
						<span className="label">Weight</span>
						{weight}kg
					</div>
				</>
			)}

			{(isActive || isCompleted) &&
				(isEditMode ? (
					<button className="btn" type="button" onClick={(e) => handleCompleted(e, index)}>
						<FontAwesomeIcon icon={faCheck} />
						Update
					</button>
				) : (
					<button className="btn" type="button" onClick={(e) => handleCompleted(e, index)}>
						{isCompleted ? (
							<>
								<FontAwesomeIcon icon={faCheck} />
								Completed
							</>
						) : (
							'Complete'
						)}
					</button>
				))}

			<style jsx>{styles}</style>
		</div>
	);
};

export default ReadOnlyExerciseItem;

// EditExerciseItem.propTypes = {
// 	exercise: PropTypes.object.isRequired,
// 	index: PropTypes.number.isRequired,
// 	confirmDelete: PropTypes.func,
// 	inputChange: PropTypes.func.isRequired,
// 	removeRep: PropTypes.func.isRequired,
// 	addRep: PropTypes.func.isRequired,
// };
