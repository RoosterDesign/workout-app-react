import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import FormGroup from '../FormGroup';
import FormLabel from '../FormLabel';
import styles from './styles';

const FormInput = ({ name, value, onChange, required }) => {
	const inputValue = !value && value !== 0 ? '' : value;

	return (
		<FormGroup>
			<label>
				<input type="checkbox" name={name} value={inputValue} onChange={onChange} required={required} />
				{name} - {inputValue}
			</label>
			<style jsx>{styles}</style>
		</FormGroup>
	);
};

export default FormInput;

FormInput.propTypes = {
	name: PropTypes.string.isRequired,
	type: PropTypes.string.isRequired,
	value: PropTypes.oneOfType([PropTypes.string.isRequired, PropTypes.number.isRequired]),
	onChange: PropTypes.func.isRequired,
	required: PropTypes.bool.isRequired,
};
