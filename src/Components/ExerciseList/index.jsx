import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import firebase from '../../firebase';
import styles from './styles';
import ExerciseItem from '../ExerciseItem';

const initialState = {
	id: '',
	name: '',
	sets: '',
	reps: [''],
	weight: '',
};

const ExerciseList = ({ exerciseIds }) => {
	const [currentExercise, setCurrentExercise] = useState(initialState);
	const [exercises, setExercises] = useState([]);

	useEffect(() => {
		exerciseIds.forEach((item) => {
			firebase
				.firestore()
				.collection('exercises')
				.doc(item)
				.get()
				.then(function (doc) {
					setExercises((exercises) => [...exercises, { id: doc.id, ...doc.data(), isCompleted: false }]);
				});
		});

		// const unsubscribe = firebase
		// 	.firestore()
		// 	.collection('exercises')
		// 	.where('workoutId', '==', workoutId)
		// 	.onSnapshot((snapshot) => {
		// 		const allExercises = snapshot.docs.map((doc) => ({
		// 			id: doc.id,
		// 			...doc.data(),
		// 			isCompleted: false,
		// 		}));
		// 		console.log('list - allExercises: ', allExercises);
		// 		setExercises(allExercises);
		// 	});
		// return () => unsubscribe();
	}, [exerciseIds]);

	const handleClick = (id) => {
		const currentExerciseObj = exercises.find((el) => {
			return el.id === id;
		});
		if (!currentExerciseObj.isCompleted) {
			setCurrentExercise(currentExercise.id !== id ? currentExerciseObj : initialState);
		}
	};

	const handleCompleted = (e, index) => {
		e.stopPropagation();

		// Update state
		const newArr = [...exercises];
		newArr[index].isCompleted = !newArr[index].isCompleted;
		setExercises(newArr);

		setCurrentExercise(initialState);

		// Auto-highligh next item in list
		// if (index + 1 < newArr.length) {
		// setCurrentExercise(newArr[index + 1]);
		// }
	};

	return (
		<>
			{/* <div>
				<p>
					Selected Exercise: {currentExercise.name}
					<br />
					Selected Sets: {currentExercise.sets}
					<br />
					Selected Reps: {currentExercise.reps}
					<br />
					Selected Weight: {currentExercise.weight}
				</p>
			</div> */}

			{exercises.map((exercise, index) => (
				<ExerciseItem exercise={exercise} currentExerciseId={currentExercise.id} index={index} key={exercise.id} handleClick={handleClick} handleCompleted={handleCompleted} />
			))}

			<style jsx>{styles}</style>
		</>
	);
};

export default ExerciseList;

ExerciseList.propTypes = {
	exerciseIds: PropTypes.array.isRequired,
};
