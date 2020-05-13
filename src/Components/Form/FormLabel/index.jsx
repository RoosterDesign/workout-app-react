import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles';

const FormLabel = ({ label }) => {
	return (
		<label>
			{label}
			<style jsx>{styles}</style>
		</label>
	);
};

export default FormLabel;

FormLabel.propTypes = {
	label: PropTypes.string.isRequired,
};
