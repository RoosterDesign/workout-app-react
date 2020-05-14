import React from 'react';
import FormInput from '../Form/FormInput';
import FormButton from '../Form/FormButton';
import styles from './styles';

const WorkoutForm = ({ type, workout, onSubmit, handleInputChange }) => {
	const { name } = workout;
	return (
		<form onSubmit={onSubmit}>
			<FormInput label="Workout name" type="text" name="name" value={name} placeholder="Enter workout name.." onChange={(event) => handleInputChange(event)} textAlign="center" required />
			{type === 'add' && <FormButton type="submit" label="Add Workout" />}
			{type === 'edit' && <FormButton type="submit" label="Update" />}
		</form>
	);
};

export default WorkoutForm;
