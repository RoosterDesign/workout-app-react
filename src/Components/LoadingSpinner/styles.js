import css from 'styled-jsx/css';
import colours from '../../config/colours';
import mediaQueries from '../../config/mediaQueries';

export default css`
	.loading {
	}
	.spinner {
		border: 4px solid ${colours.lightGrey};
		border-top: 4px solid ${colours.peppermint};
		border-radius: 50%;
		width: 90px;
		height: 90px;
		animation: spin 1s linear infinite;
	}

	@keyframes spin {
		0% {
			transform: rotate(0deg);
		}
		100% {
			transform: rotate(360deg);
		}
	}
`;
