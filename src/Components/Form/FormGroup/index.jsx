import React from 'react';
import PropTypes from 'prop-types';
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

FormGroup.propTypes = {
	children: PropTypes.node.isRequired,
};
