import React from 'react';
import styles from './styles';

const Mask = ({ children }) => {
	return (
		<div className="mask">
			{children}
			<style jsx>{styles}</style>
		</div>
	);
};

export default Mask;
