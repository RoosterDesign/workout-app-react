import css from 'styled-jsx/css';
import colours from '../../../config/colours';
import mediaQueries from '../../../config/mediaQueries';

export default css`
	.btn {
		background: ${colours.peppermint};
		border: 2px solid ${colours.peppermint};
		border-radius: 40px;
		color: ${colours.darkGreen};
		cursor: pointer;
		display: block;
		font-size: 3rem;
		font-weight: 300;
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

	@media ${mediaQueries.desktop} {
		.btn:hover,
		.outline:hover {
			background: ${colours.darkGreen};
			color: ${colours.peppermint};
		}
	}
`;
