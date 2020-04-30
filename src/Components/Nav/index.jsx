import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome } from '@fortawesome/pro-solid-svg-icons';
import { Link } from 'react-router-dom';
import styles from './styles';

const Nav = () => {
	return (
		<nav>
			<Link to="/" className="btn">
				<FontAwesomeIcon icon={faHome} />
			</Link>
			<style jsx>{styles}</style>
		</nav>
	);
};

export default Nav;
