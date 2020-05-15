import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faExclamation } from '@fortawesome/pro-solid-svg-icons';
import classNames from 'classnames';
import styles from './styles';

const Notification = ({ notificationList }) => {
	const [list, setList] = useState(notificationList);

	useEffect(() => {
		setList(notificationList);
	}, [list, notificationList]);

	const deleteNotification = useCallback(
		(id) => {
			// setTimeout(() => {
			const index = list.findIndex((e) => e.id === id);
			list.splice(index, 1);
			setList([...list]);
			// }, 3000);
		},
		[list]
	);

	useEffect(() => {
		const interval = setInterval(() => {
			if (list.length) {
				deleteNotification(list[0].id);
			}
		}, 3000);
		return () => {
			clearInterval(interval);
		};
	}, [deleteNotification, list]);

	return (
		<>
			{list.map((notification, i) => (
				<div className={classNames('notification', notification.type)} key={i} onClick={() => deleteNotification(notification.id)}>
					<div className="icon">
						{notification.type === 'success' && <FontAwesomeIcon icon={faCheck} />}
						{notification.type === 'error' && <FontAwesomeIcon icon={faExclamation} />}
					</div>
					{notification.message}
				</div>
			))}
			<style jsx>{styles}</style>
		</>
	);
};

export default Notification;

Notification.propTypes = {
	notificationList: PropTypes.array.isRequired,
};
