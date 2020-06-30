import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../../Auth';
import firebase from '../../config/firebase';
import { withRouter, useHistory, Redirect } from 'react-router-dom';
import FormInput from '../Form/FormInput';
import FormButton from '../Form/FormButton';
import styles from './style';

const Login = () => {
	const history = useHistory();
	const { currentUser } = useContext(AuthContext);
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState('');

	const onLogin = (e) => {
		e.preventDefault();
		firebase
			.login(email, password)
			.then((user) => {
				if (user) history.push('/');
			})
			.catch((err) => {
				setError(err.message);
			});
	};

	if (currentUser) {
		return <Redirect to="/" />;
	}

	return (
		!currentUser && (
			<div className="container">
				<h1>Login</h1>
				<form className="loginForm" onSubmit={onLogin}>
					<FormInput label="Email" type="text" name="email" value={email} placeholder="Email..." onChange={(e) => setEmail(e.target.value)} required />
					<FormInput label="Password" type="password" name="password" value={password} placeholder="Password..." onChange={(e) => setPassword(e.target.value)} required autocomplete="on" />

					{error && <div className="errors">{error}</div>}

					<FormButton type="submit" label="Log in" />
					<FormButton
						type="button"
						label="Register"
						onClick={() => {
							history.push('/register');
						}}
					/>
				</form>
				<style jsx>{styles}</style>
			</div>
		)
	);
};

export default withRouter(Login);
