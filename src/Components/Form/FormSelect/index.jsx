import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretCircleDown, faCaretCircleUp } from '@fortawesome/pro-solid-svg-icons';
import FormGroup from '../FormGroup';
import styles from './styles';

const FormSelect = ({ name, value, defaultOption, options, onChange, required }) => {
	const [isOpen, setIsOpen] = useState(false);
	const handleClick = () => setIsOpen(!isOpen);

	return (
		<FormGroup>
			<div className="icon">{isOpen ? <FontAwesomeIcon icon={faCaretCircleUp} /> : <FontAwesomeIcon icon={faCaretCircleDown} />}</div>
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
	name: PropTypes.string.isRequired,
	value: PropTypes.string.isRequired,
	defaultOption: PropTypes.string.isRequired,
	options: PropTypes.array.isRequired,
	onChange: PropTypes.func.isRequired,
	required: PropTypes.bool.isRequired,
};
