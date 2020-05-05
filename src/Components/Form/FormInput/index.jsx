import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import FormGroup from '../FormGroup';
import styles from './styles';

const FormInput = ({ name, type, value, placeholder, step = '1', onChange, required }, ...props) => {
	const inputClass = classNames({
		input: true,
		textCenter: props.textAlign === 'center',
	});

	const inputValue = !value && value !== 0 ? '' : value;

	const numberAttributes = { min: 0, step: step };

	return (
		<FormGroup>
			<input type={type} {...(type === 'number' && numberAttributes)} name={name} value={inputValue} placeholder={placeholder} onChange={onChange} required={required} className={inputClass} />
			<style jsx>{styles}</style>
		</FormGroup>
	);
};

export default FormInput;

FormInput.propTypes = {
	name: PropTypes.string.isRequired,
	type: PropTypes.string.isRequired,
	value: PropTypes.oneOfType([PropTypes.string.isRequired, PropTypes.number.isRequired]),
	placeholder: PropTypes.string.isRequired,
	step: PropTypes.string,
	onChange: PropTypes.func.isRequired,
	required: PropTypes.bool.isRequired,
	textAlign: PropTypes.string,
};
