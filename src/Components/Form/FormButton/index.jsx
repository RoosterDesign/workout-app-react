import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import styles from './styles';

const FormButton = ({ type, label }) => {
	const btnClass = classNames({
		btn: true,
		outline: type === 'button',
		center: type === 'textCenter',
	});
	return (
		<>
			<button type={type} className={btnClass}>
				{label}
			</button>
			<style jsx>{styles}</style>
		</>
	);
};

export default FormButton;

FormButton.propTypes = {
	type: PropTypes.string.isRequired,
	label: PropTypes.string.isRequired,
};
