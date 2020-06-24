import React, { useState, useContext } from 'react';
import { AuthContext } from '../../Auth';
import firebase from '../../config/firebase';
import { withRouter, useHistory, Redirect } from 'react-router-dom';
import styles from './style';

const Register = () => {
	const history = useHistory();
	const { currentUser } = useContext(AuthContext);
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [repeatPassword, setRepeatPassword] = useState('');

	const handleSubmit = (e) => {
		e.preventDefault();
		if (password === repeatPassword) {
			onRegister();
		} else {
			alert('PASSWORDS DONT MATCH');
		}
	};

	async function onRegister() {
		try {
			firebase.register(email, password);
			history.push('/');
		} catch (err) {
			alert(err.message);
		}
	}

	if (currentUser) {
		return <Redirect to="/" />;
	}

	return (
		!currentUser && (
			<div className="container">
				<h1>Register</h1>
				<form className="registerForm" onSubmit={handleSubmit}>
					<label>
						Email
						<input name="email" type="email" placeholder="Email" required onChange={(e) => setEmail(e.target.value)} />
					</label>
					<label>
						Password
						<input name="password" type="password" placeholder="Password" required onChange={(e) => setPassword(e.target.value)} />
					</label>
					<label>
						Repeat Password
						<input name="repeatPassword" type="password" placeholder="Repeat Password" required onChange={(e) => setRepeatPassword(e.target.value)} />
					</label>
					<button type="submit">Register</button>
					Or
					<button
						type="button"
						onClick={(e) => {
							history.push('/login');
						}}
					>
						Log In
					</button>
				</form>
				<style jsx>{styles}</style>
			</div>
		)
	);
};

export default Register;
