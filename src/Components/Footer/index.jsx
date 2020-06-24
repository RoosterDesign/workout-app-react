import React, { useContext } from 'react';
import { AuthContext } from '../../Auth';

import styles from './styles';

const Footer = () => {
	const { currentUser } = useContext(AuthContext);

	return (
		<footer>
			{currentUser !== null && currentUser.email}-{currentUser !== null && currentUser.uid}-<span className="version">workout app v1.0</span>
			<style jsx>{styles}</style>
		</footer>
	);
};

export default Footer;
