import css from 'styled-jsx/css';
import colours from '../../config/colours';
import mediaQueries from '../../config/mediaQueries';

export default css`
	.exercise {
		border: 1px solid ${colours.peppermint};
		border-radius: 4px;
		color: ${colours.peppermint};
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		margin-bottom: 20px;
		padding: 15px;
		position: relative;
	}

	.full {
		width: 100%;
	}

	.half {
		width: calc(50% - 16px);
	}

	.third {
		width: calc(33.333333% - 16px);
	}

	.repsContainer {
		position: relative;
	}

	.addRep {
		align-items: center;
		background: none;
		border: 1px solid ${colours.peppermint};
		border-radius: 22px;
		color: ${colours.peppermint};
		display: flex;
		height: 44px;
		font-size: 1.7rem;
		justify-content: center;
		outline: none;
		width: 100%;
	}

	.addRep :global(svg) {
		margin-right: 5px;
	}

	.deleteRep {
		position: absolute;
		right: 0;
		top: 20px;
		z-index: 1;
	}

	.deleteRep :global(.roundIconBtn) {
		border-radius: 16px;
		font-size: 1.4rem;
		height: 32px;
		width: 32px;
	}

	.addExercise {
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

	.removeExercise {
	}
`;
