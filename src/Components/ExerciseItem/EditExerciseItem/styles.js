import css from 'styled-jsx/css';
import colours from '../../../config/colours';
import mediaQueries from '../../../config/mediaQueries';

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

	.cancelEdit {
		right: -8px;
		position: absolute;
		top: -8px;
		z-index: 99;
	}

	.cancelEdit :global(.roundIconBtn) {
		background: ${colours.greenBlack};
	}

	.deleteExercise {
		right: -8px;
		position: absolute;
		top: -8px;
		z-index: 99;
	}

	.deleteExercise :global(.roundIconBtn) {
		background: ${colours.greenBlack};
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

	.update {
		align-items: center;
		background: ${colours.peppermint};
		/* border: 1px solid ${colours.peppermint}; */
		border: none;
		border-radius: 30px;
		color: ${colours.darkGreen};
		display: flex;
		height: 60px;
		font-size: 2.6rem;
		justify-content: center;
		margin-top: 12px;
		outline: none;
		width: 100%;
	}
`;
