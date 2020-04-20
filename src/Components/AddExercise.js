import React, { useEffect, useState } from 'react'
import firebase from '../firebase'

function AddExercise() {

    const [exerciseType, setExerciseType] = useState([]);
    const [inputFields, setInputFields] = useState({
        type: '',
        name: '',
        sets: '',
        reps: [''],
        weight: ''
    });

    useEffect(() => {
        const unsubscribe = firebase
            .firestore()
            .collection('workouts')
            .onSnapshot(snapshot => {
                const allWorkouts = snapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));
                console.log('allWorkouts: ', allWorkouts)
                setExerciseType(allWorkouts)
            });
            
            return () => unsubscribe();

      }, []);
    

    function handleAddRepsField() {
        const updatedState = {...inputFields};
        updatedState.reps.push('');
        setInputFields(updatedState);
    };

    function handleRemoveRepsField(index) {
        if(inputFields.reps.length > 1) {
            const updatedState = {...inputFields};
            updatedState.reps.splice(index, 1);
            setInputFields(updatedState);
        }
    };    

    function handleInputChange(event, index) {
        const { name, value } = event.target;
        if (name === "reps") {
            const updatedState = {...inputFields}
            updatedState.reps[index] = value;
            setInputFields(updatedState)
        } else {
            setInputFields({...inputFields, [name]: value })
        };
    };

    function onSubmit(e) {
        e.preventDefault();
        firebase
            .firestore()
            .collection('exercises')
            .add(inputFields)
            .then(() => {
                setExerciseType([])
                setInputFields({
                    type: '',
                    name: '',
                    sets: '',
                    reps: [''],
                    weight: ''
                })
            })
    };

    function resetForm() {
        setInputFields({
            type: '',
            name: '',
            sets: '',
            reps: [''],
            weight: ''
        })
    }

    return (
        <div>
            <h1>Add an exercise</h1>
            <form onSubmit={onSubmit}>
                <div>
                    <label>Type</label><br />
                    <select name="type" type="text" value={inputFields.type} onChange={(event) => handleInputChange(event)} required>
                        <option value="">Please select...</option>
                        {exerciseType.map( type => (
                            <option value={type.id} key={type.name}>{type.name}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <label>Name</label><br />
                    <input name="name" type="text" value={inputFields.name} onChange={event => handleInputChange(event)} required placeholder="Enter exercise name..." />
                </div>
                <div>
                    <label>Sets</label><br />
                    <input name="sets" min="0" type="number" value={inputFields.sets} onChange={event => handleInputChange(event)} required placeholder="Enter number of sets..." />
                </div>
                
                <div>
                    <label>Reps</label><br />
                    {
                        inputFields.reps.map( (rep, index) => (
                            <div key={index}>
                                <input name="reps" min="0" type="number" value={rep} onChange={event => handleInputChange(event, index)} required placeholder="Enter number of reps..."/>
                                <button type="button" onClick={() => handleAddRepsField()}>+ ADD</button>
                                { inputFields.reps.length > 1 && <button type="button" onClick={() => handleRemoveRepsField(index)}>- REMOVE</button> }                                
                            </div>
                        ))
                    }
                </div>

                <div>
                    <label>Weight</label><br />
                    <input name="weight" min="0" step="0.25" type="number" value ={inputFields.weight} onChange={event => handleInputChange(event)} required placeholder="Enter weight in kg..." />
                </div>
                <br />
                <button>Add Exercise</button> &nbsp;
                <button type="button" onClick={() => resetForm()}>Reset</button>
            </form>
        </div>
    )
}

export default AddExercise