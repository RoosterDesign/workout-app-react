import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/pro-solid-svg-icons';
import classNames from 'classnames';
import styles from './styles';

const Notification = ({ notificationList }) => {
	const [list, setList] = useState(notificationList);
	const [hide, setHide] = useState(false);

	useEffect(() => {
		setList(notificationList);
	}, [list, notificationList]);

	const deleteNotification = useCallback(
		(id) => {
			console.log('NOTIFICATION IS DELETED', id);

			setTimeout(() => {
				const index = list.findIndex((e) => e.id === id);
				list.splice(index, 1);
				setList([...list]);
			}, 5000);
		},
		[list]
	);

	useEffect(() => {
		console.log('list length', list.length);
		const interval = setInterval(() => {
			if (list.length) {
				deleteNotification(list[0].id);
			}
		}, 5000);
		return () => {
			clearInterval(interval);
		};
	}, [deleteNotification, list]);

	return (
		<>
			{list.map((notification, i) => (
				<div
					className={classNames({
						notification: true,
						isHidden: hide,
					})}
					id='notification-' + notification.id
					key={i}
					onClick={() => deleteNotification(notification.id)}
				>
					<div className="icon">{notification.type === 'success' && <FontAwesomeIcon icon={faCheck} />}</div>
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
