import React from 'react';
import styles from './styles.js';
import Button from '../Button';

const Add = () => {
	return (
		<div className="container">
			<h1>Add</h1>
			<p>Lorem ipsum dolor sit amet consecetur</p>

			<div className="btnWrap">
				<div className="btnEl">
					<Button href="/add/workout" type="large solid">
						Workout
					</Button>
				</div>
				<div className="btnEl">
					<Button href="add/exercise" type="large solid">
						Exercise
					</Button>
				</div>
			</div>

			<style jsx>{styles}</style>
		</div>
	);
};

export default Add;
