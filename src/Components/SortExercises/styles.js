import css from 'styled-jsx/css';
import colours from '../../config/colours';
import mediaQueries from '../../config/mediaQueries';

export default css`
	.exercisesWrap {
		border: 1px solid ${colours.peppermint};
		border-radius: 4px;
		color: ${colours.peppermint};
		font-size: 2rem;
		margin-bottom: 20px;
		padding: 30px 30px 25px;
		position: relative;
	}

	.label {
		background: ${colours.darkGreen};
		border: 1px solid ${colours.peppermint};
		border-radius: 4px;
		color: ${colours.white};
		font-size: 2.2rem;
		left: 20px;
		padding: 6px 12px;
		position: absolute;
		top: -18px;
	}

	@media ${mediaQueries.tablet} {
		.label {
			font-size: 3rem;
			padding: 6px 18px;
			top: -22px;
		}
	}

	@media ${mediaQueries.tablet} {
		.btnContainer {
			display: flex;
			justify-content: space-between;
			margin-top: 30px;
		}
		.btnContainer :global(.btn) {
			margin: 0;
			width: calc(50% - 10px);
		}
	}
`;
