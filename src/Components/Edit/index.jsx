import React from 'react';
import styles from './styles';
import Button from '../Button';

const Manage = () => {
	return (
		<div className="container">
			<h1>Edit</h1>
			<p>Lorem ipsum dolor sit amet consecetur</p>
			<div className="btnWrap">
				<div className="btnEl">
					<Button href="/edit/workouts" type="large solid">
						Workouts
					</Button>
				</div>
				<div className="btnEl">
					<Button href="edit/exercises" type="large solid">
						Exercises
					</Button>
				</div>
			</div>
			<style jsx>{styles}</style>
		</div>
	);
};

export default Manage;
