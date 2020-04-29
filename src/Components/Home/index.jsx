import React from 'react';
import styles from './styles';
import Button from '../Button';

const Home = () => {
	return (
		<div className="container">
			<div className="alignCenter">
				<Button href="/workouts" type="large solid">
					Start Workout
				</Button>

				<div className="halfWidth">
					<Button href="/add" type="small outline">
						Add
					</Button>
				</div>

				<div className="halfWidth">
					<Button href="/edit" type="small outline">
						Edit
					</Button>
				</div>
			</div>

			<style jsx>{styles}</style>
		</div>
	);
};

export default Home;
