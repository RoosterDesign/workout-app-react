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
		margin-bottom: 20px;
		padding: 20px;
	}

	.exercise:last-child {
		margin-bottom: 0;
	}

	.label {
		color: ${colours.mediumGrey};
		display: block;
		font-size: 1.6rem;
		margin-bottom: 2px;
		text-transform: uppercase;
	}

	.name {
		font-size: 2.6rem;
		margin-bottom: 25px;
		min-width: 100%;
	}

	.sets,
	.reps,
	.weight {
		font-size: 3.8rem;
	}

	.sets {
		width: 29%;
	}

	.reps {
		width: 42%;
	}

	.weight {
		width: 29%;
	}

	.btn {
		align-items: center;
		background: none;
		border: 2px solid ${colours.darkGreen};
		border-radius: 23px;
		color: ${colours.darkGreen};
		display: flex;
		font-size: 2rem;
		height: 46px;
		justify-content: center;
		margin-top: 15px;
		outline: none;
		text-decoration: none;
		text-transform: uppercase;
		width: 100%;
	}

	.exercise .btn :global(svg) {
		margin-right: 5px;
	}

	.isActive {
		background: ${colours.peppermint};
		color: ${colours.darkGreen};
	}

	.isActive .label {
		color: ${colours.darkGreen};
	}

	.isCompleted {
		border-color: ${colours.mediumGrey};
		color: ${colours.mediumGrey};
	}

	.isCompleted .btn {
		background: ${colours.peppermint};
		border-color: ${colours.peppermint};
		color: ${colours.darkGreen};
	}
`;
