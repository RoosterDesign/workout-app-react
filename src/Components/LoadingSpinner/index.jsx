import React from 'react';
import Mask from '../Mask';
import styles from './styles';

const LoadingSpinner = () => {
	return (
		<Mask>
			<div className="spinner"></div>
			<style jsx>{styles}</style>
		</Mask>
	);
};

export default LoadingSpinner;
