import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown, faCaretUp } from '@fortawesome/pro-solid-svg-icons';
import FormGroup from '../FormGroup';
import FormLabel from '../FormLabel';
import styles from './styles';

const FormSelect = ({ label, name, value, defaultOption, options, onChange, required }) => {
	const [isOpen, setIsOpen] = useState(false);
	const handleClick = () => setIsOpen(!isOpen);

	return (
		<FormGroup>
			<FormLabel label={label} />
			<div className="icon">{isOpen ? <FontAwesomeIcon icon={faCaretUp} /> : <FontAwesomeIcon icon={faCaretDown} />}</div>
			<select name={name} value={value} required={required} onChange={onChange} onClick={handleClick} className="select">
				<option value="">{defaultOption}</option>
				{options.map((type) => (
					<option value={type.id} key={type.name}>
						{type.name}
					</option>
				))}
			</select>
			<style jsx>{styles}</style>
		</FormGroup>
	);
};

export default FormSelect;

FormSelect.propTypes = {
	label: PropTypes.string.isRequired,
	name: PropTypes.string.isRequired,
	value: PropTypes.string.isRequired,
	defaultOption: PropTypes.string.isRequired,
	options: PropTypes.array.isRequired,
	onChange: PropTypes.func.isRequired,
	required: PropTypes.bool.isRequired,
};
