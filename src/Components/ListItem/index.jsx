import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles';

const ListItem = ({ key, children }) => {
	return (
		<>
			<div className="listItem" key={key}>
				{children}
			</div>
			<style jsx>{styles}</style>
		</>
	);
};

export default ListItem;

ListItem.propTypes = {
	key: PropTypes.string.isRequired,
	children: PropTypes.element.isRequired,
};
