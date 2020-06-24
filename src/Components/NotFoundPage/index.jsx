import React from 'react';
import { Link } from 'react-router-dom';
import styles from './styles';

const NotFoundPage = () => {
	return (
		<div className="container error404">
			<h1>Error 404</h1>
			<p>Page not found</p>
			<Link to="/" className="homeLink">
				Return to homepage
			</Link>
			<style jsx>{styles}</style>
		</div>
	);
};

export default NotFoundPage;
