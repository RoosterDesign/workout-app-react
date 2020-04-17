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
        const values = [...inputFields];
        values.push('');
        setInputFields(values);
    };

    const handleRemoveRepsField = index => {
        if(inputFields.reps.length > 1) {
            const values = [...inputFields];
            values.splice(index, 1);
            setInputFields(values);
        }
    };    

    const handleInputChange = (event, index) => {
        let { name, value } = event.target;
        if(name === "reps") {
            var values = {...inputFields}
            values.reps[index] = parseInt(value);
            setInputFields(values)
        } else {
            console.log('normal input');
            setInputFields({...inputFields, [name]: value })
        };
    };

    function onSubmit(e) {
        e.preventDefault();

        alert(JSON.stringify(inputFields, null, 2));

        // firebase
        //     .firestore()
        //     .collection('exercises')
        //     .add({
        //         type,
        //         name,
        //         sets: parseInt(sets),
        //         reps: Array.from(String(reps), Number),
        //         weight: parseInt(weight)
        //     })
        //     .then(() => {
        //         setType('')
        //         setName('')
        //         setSets('')
        //         setReps('')             
        //         setWeight('')
        //     })
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
                    <input name="type" type="text" defaultValue={inputFields.type} onChange={(event) => handleInputChange(event)} required />
                </div>
                <div>
                    <label>Name</label>
                    <input name="name" type="text" defaultValue={inputFields.name} onChange={event => handleInputChange(event)} required />
                </div>
                <div>
                    <label>Sets</label>
                    <input name="sets" type="number" defaultValue={inputFields.sets} onChange={event => handleInputChange(event)} required />
                </div>
                
                <div>
                    <label>Reps</label>
                    {
                        inputFields.reps.map( (rep, index) => (
                            <div key={index}>
                                {console.log(index)}
                                <input name="reps" type="number" value={rep} onChange={event => handleInputChange(event, index)} required />
                                <button type="button" onClick={() => handleAddRepsField()}>+ ADD</button>
                                <button type="button" onClick={() => handleRemoveRepsField(index)}>- REMOVE</button>
                            </div>
                        ))
                    }
                </div>

                <div>
                    <label>Weight</label>
                    <input name="weight" step="0.25" type="number" defaultValue ={inputFields.weight} onChange={event => handleInputChange(event)} required />
                </div>
                <button>Add Exercise</button>
            </form>
        </div>
    )
}

export default AddExercise