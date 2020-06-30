import React, { useState, useContext } from 'react';
import { AuthContext } from '../../Auth';
import firebase from '../../config/firebase';
import { useHistory, Redirect } from 'react-router-dom';
import FormInput from '../Form/FormInput';
import FormButton from '../Form/FormButton';
import styles from './style';

const Register = () => {
	const history = useHistory();
	const { currentUser } = useContext(AuthContext);
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [repeatPassword, setRepeatPassword] = useState('');
	const [error, setError] = useState('');

	const handleSubmit = (e) => {
		e.preventDefault();
		if (password === repeatPassword) {
			onRegister();
		} else {
			setError('Passwords do not match');
		}
	};

	async function onRegister() {
		firebase
			.register(email, password)
			.then((res) => {
				console.info(res);
				// if (user) history.push('/');
			})
			.catch((err) => {
				setError(err.message);
			});

		// try {
		// 	firebase.register(email, password);
		// 	history.push('/');
		// } catch (err) {
		// 	setError(err.message);
		// }
	}

	if (currentUser) {
		return <Redirect to="/" />;
	}

	return (
		!currentUser && (
			<div className="container">
				<h1>Register</h1>
				<form className="registerForm" onSubmit={handleSubmit}>
					<FormInput label="Email" type="text" name="email" value={email} placeholder="Email..." onChange={(e) => setEmail(e.target.value)} required />
					<FormInput label="Password" type="password" name="password" value={password} placeholder="Password..." onChange={(e) => setPassword(e.target.value)} required autocomplete="on" />
					<FormInput label="Repeat Password" type="password" name="repeatPassword" value={repeatPassword} placeholder="Repeat Password..." onChange={(e) => setRepeatPassword(e.target.value)} required autocomplete="on" />
					{error && <div className="errors">{error}</div>}
					<FormButton type="submit" label="Register" />
					<FormButton
						type="button"
						label="Login "
						onClick={() => {
							history.push('/login');
						}}
					/>
				</form>
				<style jsx>{styles}</style>
			</div>
		)
	);
};

export default Register;
