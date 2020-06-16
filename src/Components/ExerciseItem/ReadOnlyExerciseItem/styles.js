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
		margin-bottom: 20px;
		padding: 15px;
		position: relative;
		transition: padding 0.15s;
		justify-content: space-between;
	}

	.exercise:last-child {
		margin-bottom: 0;
	}

	.label {
		color: ${colours.mediumGrey};
		display: block;
		font-size: 1.3rem;
		margin-bottom: 2px;
		text-transform: uppercase;
	}

	.name {
		font-size: 2rem;
		margin-bottom: 15px;
		min-width: 100%;
	}

	.sets,
	.reps,
	.weight {
		font-size: 2.6rem;
		width: 33.33333333%;
	}

	.weightMetric {
		font-size: 1.6rem;
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
		padding: 20px;
	}

	.isActive .label {
		color: ${colours.darkGreen};
		font-size: 1.6rem;
	}

	.isActive .name {
		font-size: 2.6rem;
		margin-bottom: 25px;
	}

	.isActive .sets,
	.isActive .reps,
	.isActive .weight {
		font-size: 3.8rem;
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

	.isEditMode {
		opacity: 0.2;
	}

	.edit {
		right: -8px;
		position: absolute;
		top: -8px;
		z-index: 99;
	}

	.edit :global(.roundIconBtn) {
		background: ${colours.greenBlack};
	}

	@media ${mediaQueries.tablet} {
		.name,
		.weight,
		.sets,
		.reps {
			margin: 0;
			min-width: 0;
		}

		.label {
			font-size: 1.5rem;
			margin-bottom: 6px;
		}

		.name {
			line-height: 1.4;
			padding-right: 20px;
			width: 40%;
		}

		.sets,
		.reps,
		.weight {
			font-size: 3.6rem;
		}

		.sets {
			width: 16%;
		}

		.reps {
			width: 22%;
		}

		.weight {
			padding-left: 20px;
			width: 22%;
		}

		.isActive .name {
			font-size: 2.6rem;
			line-height: 1.3;
			margin-bottom: 0;
		}

		.isActive .sets,
		.isActive .reps,
		.isActive .weight {
			font-size: 4.6rem;
		}
	}
`;
