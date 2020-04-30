import React from 'react';
import { useLocation } from 'react-router-dom';
import styles from './styles';
import Nav from '../Nav';

const Header = () => {
	let location = useLocation();
	if (location.pathname === '/') {
		return null;
	}
	return (
		<header className="container">
			<Nav />
			<style jsx>{styles}</style>
		</header>
	);
};

export default Header;
