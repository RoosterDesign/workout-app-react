import React, { Component } from 'react'
import { Link } from 'react-router-dom'

function Nav() {
    const navStyle = {
        color: 'white',
        textDecoration: 'none'
    }
    return (
        <nav>
            <ul>
                <Link style={navStyle} to="/">
                    <li>Home</li>
                </Link>
                <Link style={navStyle} to="/workouts">
                    <li>Select Workout</li>
                </Link>
                <Link style={navStyle} to="/manage">
                    <li>Manage Workouts</li>
                </Link>
            </ul>
        </nav>
    )
}

export default Nav