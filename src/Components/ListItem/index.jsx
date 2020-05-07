import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles';

const ListItem = ({ children }) => {
	return (
		<>
			<div className="listItem">{children}</div>
			<style jsx>{styles}</style>
		</>
	);
};

export default ListItem;

ListItem.propTypes = {
	children: PropTypes.node.isRequired,
};
