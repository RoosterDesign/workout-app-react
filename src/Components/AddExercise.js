// TODO
// Change "type" to select OR checkboxes (look into pushing to multiple collections)
// Loading spinner
// Validation and prop types
// Make numbers not strings (fix issue when deleting all numbers from reps)
// Redux
// Style
// Reset form button


import React, { useEffect, useState } from 'react'
import firebase from '../firebase'

function AddExercise() {

    const [inputFields, setInputFields] = useState({
        type: '',
        name: '',
        sets: '',
        reps: [''],
        weight: ''
    });

    const handleAddRepsField = () => {
        const updatedState = {...inputFields};
        updatedState.reps.push('');
        setInputFields(updatedState);
    };

    const handleRemoveRepsField = index => {
        if(inputFields.reps.length > 1) {
            const updatedState = {...inputFields};
            updatedState.reps.splice(index, 1);
            setInputFields(updatedState);
        }
    };    

    const handleInputChange = (event, index) => {
        let { name, value } = event.target;
        if(name === "reps") {
            const updatedState = {...inputFields}
            updatedState.reps[index] = value;
            setInputFields(updatedState)
        } else {
            setInputFields({...inputFields, [name]: value })
        };
    };

    function onSubmit(e) {
        e.preventDefault();

        alert(JSON.stringify(inputFields, null, 2));

        firebase
            .firestore()
            .collection('exercises')
            .add(inputFields)
            .then(() => {
                setInputFields({
                    type: '',
                    name: '',
                    sets: '',
                    reps: [''],
                    weight: ''
                })
            })
    }

    return (
        <div>
            <h1>Add an exercise!</h1>
            <pre>
                {JSON.stringify(inputFields, null, 2)}
            </pre>
            <form onSubmit={onSubmit}>
                <div>
                    <label>Type</label>
                    <input name="type" type="text" value={inputFields.type} onChange={(event) => handleInputChange(event)} required />
                </div>
                <div>
                    <label>Name</label>
                    <input name="name" type="text" value={inputFields.name} onChange={event => handleInputChange(event)} required />
                </div>
                <div>
                    <label>Sets</label>
                    <input name="sets" min="0" type="number" value={inputFields.sets} onChange={event => handleInputChange(event)} required />
                </div>
                
                <div>
                    <label>Reps</label>
                    {
                        inputFields.reps.map( (rep, index) => (
                            <div key={index}>
                                <input name="reps" min="0" type="number" value={rep} onChange={event => handleInputChange(event, index)} required />
                                <button type="button" onClick={() => handleAddRepsField()}>+ ADD</button>
                                <button type="button" onClick={() => handleRemoveRepsField(index)}>- REMOVE</button>
                            </div>
                        ))
                    }
                </div>

                <div>
                    <label>Weight</label>
                    <input name="weight" min="0" step="0.25" type="number" value ={inputFields.weight} onChange={event => handleInputChange(event)} required />
                </div>
                <button>Add Exercise</button>
            </form>
        </div>
    )
}

export default AddExercise