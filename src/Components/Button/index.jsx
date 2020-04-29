import React from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import styles from './styles';

const Button = ({ href, type, children }) => {
	return (
		<>
			<div className="btnContainer">
				<Link to={href} className={classNames('btn', type)}>
					{children}
				</Link>
			</div>
			<style jsx>{styles}</style>
		</>
	);
};

export default Button;
