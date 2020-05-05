import css from 'styled-jsx/css';
import colours from '../../../config/colours';
import mediaQueries from '../../../config/mediaQueries';

export default css`
	.input {
		background: none;
		border: none;
		border-bottom: 2px solid ${colours.white};
		color: ${colours.white};
		font-size: 2.6rem;
		height: 50px;
		outline: none;
		transition: border-color 0.3s ease;
		width: 100%;
	}

	.input:focus {
		border-bottom-color: ${colours.peppermint};
	}

	.textCenter {
		text-align: center;
	}

	::-webkit-input-placeholder {
		color: ${colours.darkGrey};
	}

	:-ms-input-placeholder {
		color: ${colours.darkGrey};
	}

	::placeholder {
		color: ${colours.darkGrey};
	}
`;
