import React from 'react';
import styles from './styles';

const FormGroup = ({ children }) => {
	return (
		<div className="formGroup">
			{children}
			<style jsx>{styles}</style>
		</div>
	);
};

export default FormGroup;
