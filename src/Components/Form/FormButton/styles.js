import css from 'styled-jsx/css';
import colours from '../../../config/colours';
import mediaQueries from '../../../config/mediaQueries';

export default css`
	.btn {
		background: ${colours.peppermint};
		border-radius: 40px;
		color: ${colours.darkGreen};
		display: block;
		border: none;
		font-size: 3rem;
		height: 80px;
		margin: 0 auto 20px;
		outline: none;
		width: 100%;
	}

	.btn:last-child {
		margin-bottom: 0;
	}

	.outline {
		background: none;
		border: 2px solid ${colours.peppermint};
		color: ${colours.peppermint};
	}
`;
