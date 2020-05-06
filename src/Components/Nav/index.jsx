import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faArrowAltLeft } from '@fortawesome/pro-solid-svg-icons';
import { Link, useHistory } from 'react-router-dom';
import styles from './styles';

const Nav = () => {
	let history = useHistory();
	return (
		<nav>
			<button onClick={() => history.goBack()} className="btn back">
				<FontAwesomeIcon icon={faArrowAltLeft} />
			</button>
			<Link to="/" className="btn home">
				<FontAwesomeIcon icon={faHome} />
			</Link>
			<style jsx>{styles}</style>
		</nav>
	);
};

export default Nav;
