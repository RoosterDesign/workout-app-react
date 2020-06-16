import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencil, faCheck } from '@fortawesome/pro-solid-svg-icons';
import RoundIconButton from '../../RoundIconButton';
import classNames from 'classnames';
import styles from './styles';

const ReadOnlyExerciseItem = ({ exercise, index, editMode, handleClick, handleCompleted, handleEdit }) => {
	const { name, weight, sets, reps, isActive, isCompleted } = exercise;
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
			{isActive && !isCompleted && (
				<div className="edit">
					<RoundIconButton type="button" onClick={(e) => handleEdit(e, index)}>
						<FontAwesomeIcon icon={faPencil} />
					</RoundIconButton>
				</div>
			)}

			<div className="name">
				<span className="label">Name</span>
				{name}
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

ReadOnlyExerciseItem.propTypes = {
	exercise: PropTypes.shape({
		name: PropTypes.string.isRequired,
		weight: PropTypes.number.isRequired,
		sets: PropTypes.number.isRequired,
		reps: PropTypes.array.isRequired,
		isActive: PropTypes.bool.isRequired,
		isCompleted: PropTypes.bool.isRequired,
	}),
	editMode: PropTypes.bool.isRequired,
	index: PropTypes.number.isRequired,
	handleClick: PropTypes.func.isRequired,
	handleCompleted: PropTypes.func.isRequired,
	handleEdit: PropTypes.func.isRequired,
};
