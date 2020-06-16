import css from 'styled-jsx/css';
import colours from '../../config/colours';
import mediaQueries from '../../config/mediaQueries';

export default css`
	.modal {
		align-items: center;
		background: ${colours.peppermint};
		color: ${colours.darkGreen};
		border-radius: 4px;
		display: flex;
		justify-content: center;
		flex-direction: column;
		max-width: 90%;
		padding: 30px;
		width: 100%;
	}

	.icon {
		align-items: center;
		border: 2px solid ${colours.darkGreen};
		border-radius: 50%;
		display: flex;
		font-size: 3.6rem;
		justify-content: center;
		height: 70px;
		margin-bottom: 5px;
		width: 70px;
	}

	.title {
		font-size: 3.6rem;
		margin-bottom: 8px;
	}

	.body {
		font-size: 2rem;
	}

	.btn {
		background: none;
		border: 2px solid ${colours.darkGreen};
		border-radius: 40px;
		color: ${colours.darkGreen};
		cursor: pointer;
		display: block;
		font-size: 2.4rem;
		font-weight: 300;
		height: 50px;
		margin-top: 15px;
		outline: none;
		width: 100%;
	}

	.btn:first-of-type {
		margin-top: 20px;
	}

	.btn.delete {
		background: ${colours.red};
		border-color: ${colours.red};
		color: ${colours.white};
	}

	@media ${mediaQueries.tablet} {
		.modal {
			max-width: 400px;
		}
	}

	@media ${mediaQueries.desktop} {
		.btn:hover {
			background: ${colours.darkGreen};
			color: ${colours.peppermint};
		}
		.btn.delete:hover {
			background: ${colours.white};
			border-color: ${colours.white};
			color: ${colours.red};
		}
	}
`;
