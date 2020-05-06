import React from 'react';
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
