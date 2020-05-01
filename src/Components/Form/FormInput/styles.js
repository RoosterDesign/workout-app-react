import css from 'styled-jsx/css';
import colours from '../../../config/colours';
import mediaQueries from '../../../config/mediaQueries';

export default css`
	.formGroup {
		margin-bottom: 30px;
	}

	.input {
		background: none;
		border: none;
		border-bottom: 2px solid #fff;
		color: #fff;
		font-size: 3rem;
		height: 50px;
		outline: none;
		transition: border-color 0.3s ease;
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
