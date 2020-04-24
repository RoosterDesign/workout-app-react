import React from 'react';
import { Link } from 'react-router-dom';
import styles from './styles';

const Nav = () => {
	const navStyle = {
		color: 'white',
		textDecoration: 'none',
	};
	return (
		<nav>
			<ul>
				<li>
					<Link style={navStyle} to="/">
						Home
					</Link>
				</li>
				<li>
					<Link style={navStyle} to="/workouts">
						Select Workout
					</Link>
				</li>
				<li>
					<Link style={navStyle} to="/add">
						Add
					</Link>
				</li>
				<li>
					<Link style={navStyle} to="/edit">
						Edit
					</Link>
				</li>
			</ul>
			<style jsx>{styles}</style>
		</nav>
	);
};

export default Nav;
