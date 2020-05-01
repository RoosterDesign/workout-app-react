import css from 'styled-jsx/css';
import colours from '../../../config/colours';
import mediaQueries from '../../../config/mediaQueries';

export default css`
	.container {
		padding-bottom: 75px;
	}

	.addRepsBtn {
		background: ${colours.peppermint};
		border: none;
		border-radius: 25px;
		color: ${colours.darkGreen};
		display: block;
		font-size: 2rem;
		height: 50px;
		margin-bottom: 50px;
		outline: none;
		width: 100%;
	}
`;
