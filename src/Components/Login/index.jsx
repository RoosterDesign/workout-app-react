import React, { useState, useContext } from 'react';
import { AuthContext } from '../../Auth';
import firebase from '../../config/firebase';
import { withRouter, useHistory, Redirect } from 'react-router-dom';
import styles from './style';

const Login = () => {
	const history = useHistory();
	const { currentUser } = useContext(AuthContext);
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const handleSubmit = (e) => {
		e.preventDefault();
		firebase
			.login(email, password)
			.then(history.push('/'))
			.catch((err) => {
				alert(err);
			});
	};

	if (currentUser) {
		return <Redirect to="/" />;
	}

	return (
		!currentUser && (
			<div className="container">
				<h1>Login</h1>
				<form className="loginForm" onSubmit={handleSubmit}>
					<label>
						Email
						<input name="email" type="email" placeholder="Email" required onChange={(e) => setEmail(e.target.value)} />
					</label>
					<label>
						Password
						<input name="password" type="password" placeholder="Password" required onChange={(e) => setPassword(e.target.value)} />
					</label>
					<button type="submit">Log in</button>
					Or
					<button
						type="button"
						onClick={(e) => {
							history.push('/register');
						}}
					>
						Register
					</button>
				</form>
				<style jsx>{styles}</style>
			</div>
		)
	);
};

export default withRouter(Login);
