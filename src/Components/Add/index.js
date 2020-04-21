import React from 'react'
import { Link } from 'react-router-dom'

function Add() {
    return (
        <div>
            <h1>Add</h1>
            <ul>
                <li>
                    <Link to="/add/workout">
                        Workouts
                    </Link>
                </li>
                <li>
                <Link to="/add/exercise">
                        Exercises
                    </Link>
                </li>
            </ul>
        </div>
    )
}

export default Add