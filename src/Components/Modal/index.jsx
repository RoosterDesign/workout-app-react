import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faExclamation } from '@fortawesome/pro-solid-svg-icons';
import Mask from '../Mask';
import styles from './styles';

const Modal = ({ type, title, body, closeModal, handleDelete }) => {
	return (
		<Mask>
			{type === 'success' && (
				<div className="modal">
					<div className="icon">
						<FontAwesomeIcon icon={faCheck} />
					</div>
					<span className="title">{title}</span>
					<span className="body">{body}</span>
					<button className="btn" onClick={() => closeModal()}>
						Close
					</button>
				</div>
			)}

			{type === 'delete' && (
				<div className="modal">
					<div className="icon">
						<FontAwesomeIcon icon={faExclamation} />
					</div>
					<span className="title">{title}</span>
					<span className="body">{body}</span>

					<button className="btn delete" onClick={() => handleDelete()}>
						Yes, delete
					</button>

					<button className="btn" onClick={() => closeModal()}>
						No, go back
					</button>
				</div>
			)}

			<style jsx>{styles}</style>
		</Mask>
	);
};

export default Modal;

Modal.propTypes = {
	type: PropTypes.string.isRequired,
	title: PropTypes.string.isRequired,
	body: PropTypes.string.isRequired,
	closeModal: PropTypes.func.isRequired,
	handleDelete: PropTypes.func,
};
