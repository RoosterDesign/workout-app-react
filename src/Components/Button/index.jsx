import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import styles from './styles';

const Button = ({ href, type, children }) => {
	return (
		<div className="btnContainer">
			<Link to={href} className={classNames('btn', type)}>
				{children}
			</Link>
			<style jsx>{styles}</style>
		</div>
	);
};

export default Button;

Button.propTypes = {
	href: PropTypes.string.isRequired,
	type: PropTypes.string.isRequired,
	children: PropTypes.element.isRequired,
};
