import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/pro-solid-svg-icons';
import classNames from 'classnames';
import styles from './styles';

const ExerciseItem = ({ exercise, currentExerciseId, index, handleClick, handleCompleted }) => {
	const { id, name, reps, sets, weight, isCompleted } = exercise;
	const isActive = id === currentExerciseId;
	return (
		<div
			className={classNames({
				exercise: true,
				isActive: isActive,
				isCompleted: isCompleted,
			})}
			onClick={() => handleClick(id)}
		>
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
				{weight}kg
			</div>

			{(isActive || isCompleted) && (
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
			)}

			<style jsx>{styles}</style>
		</div>
	);
};

export default ExerciseItem;

ExerciseItem.propTypes = {
	exercise: PropTypes.shape({
		id: PropTypes.number.isRequired,
		name: PropTypes.string.isRequired,
		reps: PropTypes.array.isRequired,
		sets: PropTypes.number.isRequired,
		weight: PropTypes.number.isRequired,
		isCompleted: PropTypes.bool.isRequired,
	}),
	currentExerciseId: PropTypes.number,
	index: PropTypes.number.isRequired,
	handleClick: PropTypes.func.isRequired,
	handleCompleted: PropTypes.func.isRequired,
};
