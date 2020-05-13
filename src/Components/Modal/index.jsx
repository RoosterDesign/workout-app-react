import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/pro-solid-svg-icons';
import styles from './styles';

const Modal = ({ type, title, body, closeModal }) => {
	return (
		<div className="mask">
			<div className="modal">
				<div className="icon">{type === 'success' && <FontAwesomeIcon icon={faCheck} />}</div>
				<span className="title">{title}</span>
				<span className="body">{body}</span>
				<button className="btn" onClick={() => closeModal()}>
					Close
				</button>
			</div>
			<style jsx>{styles}</style>
		</div>
	);
};

export default Modal;

Modal.propTypes = {
	type: PropTypes.string.isRequired,
	title: PropTypes.string.isRequired,
	body: PropTypes.string.isRequired,
	closeModal: PropTypes.func.isRequired,
};
