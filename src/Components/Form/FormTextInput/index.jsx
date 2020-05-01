import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import styles from './styles';

const FormTextInput = ({ name, value, placeholder, onChange, required, ...props }) => {
	const inputClass = classNames({
		input: true,
		textCenter: props.textAlign === 'center',
	});
	return (
		<div className="formGroup">
			<input type="text" name={name} value={value} placeholder={placeholder} onChange={onChange} required={required} className={inputClass} />
			<style jsx>{styles}</style>
		</div>
	);
};

export default FormTextInput;

FormTextInput.propTypes = {
	name: PropTypes.string.isRequired,
	value: PropTypes.string.isRequired,
	placeholder: PropTypes.string.isRequired,
	onChange: PropTypes.func.isRequired,
	required: PropTypes.bool.isRequired,
	textAlign: PropTypes.string,
};
