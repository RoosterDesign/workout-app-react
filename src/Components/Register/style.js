import css from 'styled-jsx/css';
import colours from '../../config/colours';
import mediaQueries from '../../config/mediaQueries';

export default css`
	.registerForm {
		margin: 100px auto 0;
		text-align: center;
		width: 500px;
	}
	label {
		display: block;
		font-size: 2rem;
		margin-bottom: 30px;
		text-align: left;
	}
	input {
		height: 60px;
		margin-top: 10px;
		width: 100%;
	}

	button {
		height: 60px;
		margin: 10px 0;
		width: 100%;
	}
`;
