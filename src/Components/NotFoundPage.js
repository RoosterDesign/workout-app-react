import React from 'react'
import { Link } from 'react-router-dom'

function NotFoundPage() {
    return (
        <div>
            <h1>Error 404</h1>
            <p>Page not found</p>
            <Link to="/">Return to homepage</Link>
        </div>
    )
}

export default NotFoundPage