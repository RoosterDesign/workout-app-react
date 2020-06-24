import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import firebase from './config/firebase';

export const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
	const [currentUser, setCurrentUser] = useState(JSON.parse(localStorage.getItem('user')));

	useEffect(() => {
		firebase.authChange((user) => {
			if (user) {
				localStorage.setItem('user', JSON.stringify(user));
				setCurrentUser(user);
			} else {
				localStorage.removeItem('user');
				setCurrentUser(null);
			}
		});
	}, []);

	return <AuthContext.Provider value={{ currentUser }}>{children}</AuthContext.Provider>;
};

AuthProvider.propTypes = {
	children: PropTypes.node.isRequired,
};
