import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
	return (
		<div className="container">
			<h1>Error 404</h1>
			<p>Page not found</p>
			<Link to="/">Return to homepage</Link>
		</div>
	);
};

export default NotFoundPage;
