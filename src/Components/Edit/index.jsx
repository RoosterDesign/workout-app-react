import React from 'react';
import { Link } from 'react-router-dom';

const Manage = () => {
	return (
		<div>
			<h1>Edit</h1>
			<ul>
				<li>
					<Link to="/edit/workouts">Workouts</Link>
				</li>
				<li>
					<Link to="/edit/exercises">Exercises</Link>
				</li>
			</ul>
		</div>
	);
};

export default Manage;
