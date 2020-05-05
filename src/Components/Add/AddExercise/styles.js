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

	.repsContainer {
		position: relative;
	}

	.deleteRepBtn {
		background: none;
		border: 2px solid ${colours.peppermint};
		border-radius: 50%;
		color: ${colours.peppermint};
		font-size: 2rem;
		height: 38px;
		outline: none;
		position: absolute;
		right: 0;
		top: 0;
		width: 38px;
		z-index: 1;
	}
`;
