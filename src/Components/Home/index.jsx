import React from 'react';
import { Link } from 'react-router-dom';

import styles from './styles';

const Home = () => {
	return (
		<div className="container">
			<div>
				<div className="btnContainer -large">
					<Link to="/workouts" className="btn">
						Start
					</Link>
				</div>
				<div className="btnContainer">
					<Link to="/add" className="btn">
						Add
					</Link>
				</div>
				<div className="btnContainer">
					<Link to="/edit" className="btn">
						Manage
					</Link>
				</div>
			</div>

			<style jsx>{styles}</style>
		</div>
	);
};

export default Home;
