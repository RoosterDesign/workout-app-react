import React, { useState, useEffect } from 'react'
import firebase from 'firebase'

function EditWorkout({ match }) {

    const [workout, setWorkout] = useState({ id: '', name: ''})

    useEffect(() => {
        const unsubscribe = firebase
            .firestore()
            .collection('workouts')
            .doc(match.params.id)
            .onSnapshot(snapshot => {
                const workout = snapshot.data();
                console.log(workout)
                setWorkout({id: match.params.id, name: workout.name})
            })
        return () => unsubscribe
    }, [match.params.id])

    function handleChange(event) {
        const { name, value } = event.target
        console.log("name: ", name)
        console.log("name: ", value)
        setWorkout({...workout, [name]: value})
    }

    function onSubmit(e) {
        e.preventDefault()
        firebase
            .firestore()
            .collection('workouts')
            .doc(match.params.id)
            .set({
                id: workout.id,
                name: workout.name
            })
            .then(() => {
                console.log('Updated!')
            });
    }

    return (
        <div>
            <h1>Edit Workout: {workout.name}</h1>
            <form onSubmit={onSubmit}>
                <div>
                    <label>Workout ID</label><br/>
                    <input type="text" value={workout.id} name="id" onChange={(event) => handleChange(event)} />
                </div>
                <div>
                    <label>Workout Name</label><br/>
                    <input type="text" value={workout.name} name="name" onChange={(event) => handleChange(event)} />
                </div>
                <br />
                <button>Update</button>
            </form>
        </div>
    )
}

export default EditWorkout