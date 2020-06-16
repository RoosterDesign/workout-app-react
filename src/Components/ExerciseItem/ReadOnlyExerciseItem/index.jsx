import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencil, faCheck } from '@fortawesome/pro-solid-svg-icons';
import RoundIconButton from '../../RoundIconButton';
import classNames from 'classnames';
import styles from './styles';

const ReadOnlyExerciseItem = ({ exercise, editMode, index, handleClick, handleCompleted, handleEdit }) => {
	const { name, weight, sets, reps, isEditMode, isActive, isCompleted } = exercise;
	return (
		<div
			className={classNames({
				exercise: true,
				isActive: isActive,
				isCompleted: isCompleted,
				isEditMode: editMode,
			})}
			onClick={() => handleClick(index)}
		>
			{editMode && 'edit mode'}

			{isActive && !isCompleted && (
				<div className="edit">
					<RoundIconButton type="button" onClick={(e) => handleEdit(e, index)}>
						<FontAwesomeIcon icon={faPencil} />
					</RoundIconButton>
				</div>
			)}

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
				{weight}
				<span className="weightMetric"> kg</span>
			</div>

			{(isActive || isCompleted) && (
				<button className="btn" type="button" onClick={(e) => handleCompleted(e, index)}>
					{isCompleted ? (
						<>
							<FontAwesomeIcon icon={faCheck} />
							Completed
						</>
					) : (
						'Mark Completed'
					)}
				</button>
			)}

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
