import React from 'react'
import { Link } from 'react-router-dom'

function Manage() {
    return (
        <div>
            <h1>Manage</h1>
            <ul>
                <li>
                    <Link to="/edit/workouts">
                        Workouts
                    </Link>
                </li>
                <li>
                    <Link to="/edit/exercises">
                        Exercises
                    </Link>
                </li>
            </ul>
        </div>
    )
}

export default Manage