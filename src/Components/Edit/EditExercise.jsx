import React, { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import firebase from 'firebase';

const EditExercise = ({ match }) => {
  const [exercise, setExercise] = useState({
    workoutId: '',
		name: '',
		sets: '',
		reps: [''],
		weight: ''
  })
  const history = useHistory()

  useEffect(() => {
    const unsbuscribe = firebase
      .firestore()
      .collection('exercises')
      .doc(match.params.id)
      .onSnapshot(snapshot => {
        const exercise = snapshot.data();
        setExercise(exercise)
      })
      return () => unsbuscribe
  }, [match.params.id])

  const handleChange = event => {
    const { name, value } = event.target;
    setExercise({
      ...exercise,
      [name]: value
    })
  }

  const onSubmit = e => {
    e.preventDefault();
    firebase
      .firestore()
      .collection('exercises')
      .doc(match.params.id)
      .set({
        ...exercise,
        name: exercise.name
      })
      .then(() => {
        console.log('Updated!')
      });
  }

  const handleCancel = () => {
    history.goBack()
  }


  // TODO
  // add dropdown for selecting workout
  // loop through reps
  // able to add and remove reps

  return (
    <>
      <h1>Edit exercise: {exercise.name}</h1>
      <form onSubmit={onSubmit}>
        <div>
          <label>workoutId</label><br />
          <input type="text" name="workoutId" value={exercise.workoutId} onChange={ event => handleChange(event) } />
        </div>
        <br />

        <div>
          <label>Name</label><br />
          <input type="text" name="name" value={exercise.name} onChange={ event => handleChange(event) } />
        </div>
        <br />

        <div>
          <label>sets</label><br />
          <input type="number" name="sets" value={exercise.sets} onChange={ event => handleChange(event) } />
        </div>
        <br />

        <div>
          <label>Reps</label><br />
          ...
        </div>
        <br />

        <div>
          <label>Weight</label><br />
          <input type="number" name="weight" value={exercise.weight} onChange={ event => handleChange(event) } />
        </div>
        <br />

				<button>Update</button>
				&nbsp;
				<button type="button" onClick={() => handleCancel()}>Cancel</button>
      </form>
    </>
  )
}

export default EditExercise