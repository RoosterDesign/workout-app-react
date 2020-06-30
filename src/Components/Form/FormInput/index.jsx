import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import FormGroup from '../FormGroup';
import FormLabel from '../FormLabel';
import styles from './styles';

const FormInput = ({ label, name, type, value, placeholder, autocomplete, step = '1', onChange, required }, ...props) => {
	const inputClass = classNames({
		input: true,
		textCenter: props.textAlign === 'center',
	});

	const inputValue = !value && value !== 0 ? '' : value;

	const numberAttributes = { min: 0, step: step };

	return (
		<FormGroup>
			<FormLabel label={label} />
			<input type={type} {...(type === 'number' && numberAttributes)} name={name} value={inputValue} placeholder={placeholder} onChange={onChange} required={required} className={inputClass} autoComplete={autocomplete} />
			<style jsx>{styles}</style>
		</FormGroup>
	);
};

export default FormInput;

FormInput.propTypes = {
	label: PropTypes.string.isRequired,
	name: PropTypes.string.isRequired,
	type: PropTypes.string.isRequired,
	value: PropTypes.oneOfType([PropTypes.string.isRequired, PropTypes.number.isRequired]),
	placeholder: PropTypes.string.isRequired,
	autocomplete: PropTypes.string,
	step: PropTypes.string,
	onChange: PropTypes.func.isRequired,
	required: PropTypes.bool.isRequired,
	textAlign: PropTypes.string,
};
