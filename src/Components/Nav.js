import React from 'react'
import { Link } from 'react-router-dom'

function Nav() {
    const navStyle = {
        color: 'white',
        textDecoration: 'none'
    }
    return (
        <nav>
            <ul>
                <li>
                    <Link style={navStyle} to="/">Home</Link>
                </li>
                <li>
                    <Link style={navStyle} to="/add/workout">Add Workout</Link>
                </li>
                <li>
                    <Link style={navStyle} to="/add/exercise">Add Exercise</Link>
                </li>
                <li>
                    <Link style={navStyle} to="/workouts">Select Workout</Link>
                </li>
                <li>
                    <Link style={navStyle} to="/manage">Manage Workouts</Link>
                </li>
            </ul>
        </nav>
    )
}

export default Nav