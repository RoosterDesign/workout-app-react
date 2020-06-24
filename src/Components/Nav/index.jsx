import React, { useContext } from 'react';
import { AuthContext } from '../../Auth';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faArrowAltLeft, faPencil, faSignIn, faSignOut } from '@fortawesome/pro-solid-svg-icons';
import { Link, useLocation, useHistory } from 'react-router-dom';
import firebase from '../../config/firebase';
import styles from './styles';

const Nav = () => {
	const location = useLocation();
	const history = useHistory();
	const { currentUser } = useContext(AuthContext);

	const handleLogout = () => {
		firebase.logout();
	};
	return (
		<nav>
			{location.pathname !== '/' && (
				<button onClick={() => history.goBack()} className="btn back">
					<FontAwesomeIcon icon={faArrowAltLeft} />
				</button>
			)}

			{currentUser != null ? (
				<button className="btn signOut" onClick={() => handleLogout()}>
					<FontAwesomeIcon icon={faSignOut} />
				</button>
			) : (
				<>
					<Link to="/login" className="btn signIn">
						<FontAwesomeIcon icon={faSignIn} />
					</Link>
					<Link to="/register" className="btn register">
						<FontAwesomeIcon icon={faPencil} />
					</Link>
				</>
			)}

			{location.pathname !== '/' && (
				<Link to="/" className="btn home">
					<FontAwesomeIcon icon={faHome} />
				</Link>
			)}
			<style jsx>{styles}</style>
		</nav>
	);
};

export default Nav;
