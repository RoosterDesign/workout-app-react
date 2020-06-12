import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Nav from '../Nav';
import classNames from 'classnames';
import styles from './styles';

const Header = () => {
	const [hasScrolled, setHasScrolled] = useState(false);

	useEffect(() => {
		window.addEventListener('scroll', () => {
			setHasScrolled(window.scrollY !== 0);
		});
	}, []);

	let location = useLocation();
	if (location.pathname === '/') {
		return null;
	}

	return (
		<header
			className={classNames({
				container: true,
				cf: true,
				hasScrolled: hasScrolled,
			})}
		>
			<Nav />
			<style jsx>{styles}</style>
		</header>
	);
};

export default Header;
