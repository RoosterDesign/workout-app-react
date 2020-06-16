import css from 'styled-jsx/css';
import colours from '../../../config/colours';
import mediaQueries from '../../../config/mediaQueries';

export default css`
	.input {
		background: none;
		border: none;
		border-radius: 0;
		border-bottom: 2px solid ${colours.white};
		color: ${colours.white};
		font-size: 2.6rem;
		font-weight: 300;
		height: 50px;
		outline: none;
		padding: 0;
		transition: border-color 0.3s ease;
		-webkit-appearance: none;
		width: 100%;
	}

	.input::-webkit-outer-spin-button,
	.input::-webkit-inner-spin-button {
		-webkit-appearance: none;
		margin: 0;
	}

	.input[type='number'] {
		-moz-appearance: textfield;
	}

	.input:focus {
		border-bottom-color: ${colours.peppermint};
	}

	.textCenter {
		text-align: center;
	}

	::-webkit-input-placeholder {
		color: ${colours.darkGrey};
		font-size: 2rem;
	}

	:-ms-input-placeholder {
		color: ${colours.darkGrey};
		font-size: 2rem;
	}

	::placeholder {
		color: ${colours.darkGrey};
		font-size: 2rem;
	}

	@media ${mediaQueries.tabletLarge} {
		.input {
			font-size: 3rem;
			height: 60px;
		}
	}
`;
