import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faTrash } from '@fortawesome/pro-solid-svg-icons';
import { useHistory } from 'react-router-dom';
import firebase from 'firebase';
import styles from './styles';
import FormSelect from '../../Form/FormSelect';
import FormInput from '../../Form/FormInput';
import FormButton from '../../Form/FormButton';
import RoundIconButton from '../../RoundIconButton';

// TODO
// Loading Spinner
// Success message

const EditExercise = ({ match }) => {
	const initialState = {
		workoutId: '',
		name: '',
		sets: '',
		reps: [''],
		weight: '',
	};

	const [workouts, setWorkouts] = useState([]);
	const [exercise, setExercise] = useState(initialState);
	const history = useHistory();

	useEffect(() => {
		const unsbuscribeWorkouts = firebase
			.firestore()
			.collection('workouts')
			.onSnapshot((snapshot) => {
				const allWorkouts = snapshot.docs.map((doc) => ({
					id: doc.id,
					...doc.data(),
				}));
				setWorkouts(allWorkouts);
			});

		const unsbuscribeExercises = firebase
			.firestore()
			.collection('exercises')
			.doc(match.params.id)
			.onSnapshot((snapshot) => {
				const exercise = snapshot.data();
				setExercise(exercise);
			});

		return () => {
			unsbuscribeWorkouts();
			unsbuscribeExercises();
		};
	}, [match.params.id]);

	const handleAddRepsField = () => {
		const updatedState = { ...exercise };
		updatedState.reps.push('');
		setExercise(updatedState);
	};

	const handleRemoveRepsField = (index) => {
		if (exercise.reps.length > 1) {
			const updatedState = { ...exercise };
			updatedState.reps.splice(index, 1);
			setExercise(updatedState);
		}
	};

	const handleInputChange = (event, index) => {
		const { name, value, type } = event.target;
		if (name === 'reps') {
			const updatedState = { ...exercise };
			updatedState.reps[index] = parseFloat(value);
			setExercise(updatedState);
		} else if (type === 'number') {
			setExercise({ ...exercise, [name]: parseFloat(value) });
		} else {
			setExercise({ ...exercise, [name]: value });
		}
	};

	const onSubmit = (e) => {
		e.preventDefault();
		firebase
			.firestore()
			.collection('exercises')
			.doc(match.params.id)
			.set({
				...exercise,
				name: exercise.name,
			})
			.then(() => {
				console.log('Updated!');
			});
	};

	const handleCancel = () => {
		history.goBack();
	};

	return (
		<div className="container">
			<h1>Edit exercise</h1>
			<p>Lorem ipsum dolor sit amet consecetur</p>

			<form onSubmit={onSubmit}>
				<FormSelect name="workoutId" value={exercise.workoutId} defaultOption="Select workout..." options={workouts} onChange={(event) => handleInputChange(event)} required />
				<FormInput type="text" name="name" value={exercise.name} placeholder="Enter exercise name.." onChange={(event) => handleInputChange(event)} required />
				<FormInput type="number" name="weight" value={exercise.weight} placeholder="Enter weight in kg.." onChange={(event) => handleInputChange(event)} step="0.25" required />
				<FormInput type="number" name="sets" value={exercise.sets} placeholder="Enter number of sets.." onChange={(event) => handleInputChange(event)} required />
				{exercise.reps.map((rep, index) => (
					<div key={index} className="repsContainer">
						{exercise.reps.length > 1 && (
							<div className="deleteRepBtn">
								<RoundIconButton type="button" onClick={() => handleRemoveRepsField(index)}>
									<FontAwesomeIcon icon={faTrash} />
								</RoundIconButton>
							</div>
						)}
						<FormInput type="number" name="reps" value={rep} placeholder="Enter number of reps.." onChange={(event) => handleInputChange(event, index)} required />
					</div>
				))}
				<button type="button" onClick={() => handleAddRepsField()} className="addRepsBtn">
					<FontAwesomeIcon icon={faPlus} /> Add additional reps
				</button>
				<FormButton type="submit" label="Update" />
				<FormButton type="button" label="Cancel" onClick={() => handleCancel()} />
			</form>
			<style jsx>{styles}</style>
		</div>
	);
};

export default EditExercise;

EditExercise.propTypes = {
	match: PropTypes.object.isRequired,
};
