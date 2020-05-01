import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import styles from './styles';

const FormNumberInput = ({ name, value, placeholder, step = '1', onChange, required, ...props }) => {
	const inputValue = !value && value !== 0 ? '' : value;
	const inputClass = classNames({
		input: true,
		textCenter: props.textAlign === 'center',
	});
	return (
		<div className="formGroup">
			<input type="number" min="0" name={name} value={inputValue} placeholder={placeholder} onChange={onChange} step={step} required={required} className={inputClass} />
			<style jsx>{styles}</style>
		</div>
	);
};

export default FormNumberInput;

FormNumberInput.propTypes = {
	name: PropTypes.string.isRequired,
	value: PropTypes.oneOfType([PropTypes.string.isRequired, PropTypes.number.isRequired]),
	placeholder: PropTypes.string.isRequired,
	step: PropTypes.string,
	onChange: PropTypes.func.isRequired,
	required: PropTypes.bool.isRequired,
	textAlign: PropTypes.string,
};
