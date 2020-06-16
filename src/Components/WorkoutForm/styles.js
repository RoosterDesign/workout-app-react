import css from 'styled-jsx/css';
import colours from '../../config/colours';
import mediaQueries from '../../config/mediaQueries';

export default css`
	.addExercise {
		background: ${colours.peppermint};
		border: 2px solid ${colours.peppermint};
		border-radius: 25px;
		color: ${colours.darkGreen};
		cursor: pointer;
		display: block;
		font-size: 2rem;
		height: 50px;
		margin-bottom: 50px;
		outline: none;
		width: 100%;
	}

	@media ${mediaQueries.tablet} {
		.addExercise {
			margin: 0 auto 30px;
			width: 50%;
		}
		.btnContainer {
			display: flex;
			justify-content: space-between;
		}
		.btnContainer :global(.btn) {
			margin: 0;
			width: calc(50% - 10px);
		}
	}
	@media ${mediaQueries.tabletLarge} {
		.addExercise {
			margin-bottom: 40px;
		}
	}

	@media ${mediaQueries.desktop} {
		.addExercise:hover {
			background: ${colours.darkGreen};
			color: ${colours.peppermint};
		}
	}
`;
