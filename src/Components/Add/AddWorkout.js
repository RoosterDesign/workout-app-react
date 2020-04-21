import React, { useState } from 'react'
import firebase from 'firebase'

function AddWorkout() {

    const [workout, setWorkout] = useState({ id: '', name: ''})

    function handleInputChange(event) {
        const { value } = event.target;        
        const id = value.toLowerCase().replace(/[^a-zA-Z0-9]+(.)/g, (m, chr) => chr.toUpperCase());
        setWorkout({id, name: value})
    }

    function onSubmit(e) {
        e.preventDefault();
        console.log(workout.id)
        console.log(workout.name)
        firebase
            .firestore()
            .collection('workouts')
            .doc(workout.id)
            .set({name: workout.name})
            .then(() => {
                setWorkout({ id: '', name: ''})
            })
    }


    return (
        <div>
        <h1>Add a workout</h1>
        <pre>{JSON.stringify(workout)}</pre>
        <form onSubmit={onSubmit}>
            <div>
                <label>Workout Name</label><br />
                <input type="text" name="name" value={workout.name} placeholder="Enter workout name..." onChange={(event) => handleInputChange(event) } required />
            </div>
            <br />
            <button>Add Workout</button>
        </form>
        </div>
    )
}

export default AddWorkout