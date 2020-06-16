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

	.deleteExercise {
		right: -8px;
		position: absolute;
		top: -8px;
		z-index: 99;
	}

	.deleteExercise :global(.roundIconBtn) {
		background: ${colours.greenBlack};
	}

	.exerciseName,
	.weight,
	.sets,
	.repSingular {
		width: 100%;
	}

	.reps {
		width: calc(50% - 16px);
	}

	.repsContainer {
		position: relative;
	}

	.addRep {
		align-items: center;
		background: none;
		border: 1px solid ${colours.peppermint};
		border-radius: 25px;
		color: ${colours.peppermint};
		display: flex;
		height: 50px;
		font-size: 2rem;
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

	@media ${mediaQueries.tablet} {
		.exerciseName,
		.weight,
		.sets,
		.repSingular,
		.reps {
			width: calc(50% - 16px);
		}
		.addRep {
			border-radius: 25px;
			height: 50px;
			font-size: 2rem;
		}
	}
`;
