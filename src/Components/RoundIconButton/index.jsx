import React from 'react';
import { Link } from 'react-router-dom';
import styles from './styles';

const RoundIconButton = ({ type, href, onClick, children }) => {
	const renderLinkOrButton = () => {
		if (type === 'link') {
			return (
				<Link to={href} className="roundIconBtn">
					{children}
				</Link>
			);
		} else if (type === 'button') {
			return (
				<button onClick={onClick} className="roundIconBtn">
					{children}
				</button>
			);
		}
	};

	return (
		<>
			{renderLinkOrButton()}
			<style jsx>{styles}</style>
		</>
	);
};

export default RoundIconButton;
