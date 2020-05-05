import css from 'styled-jsx/css';
import colours from '../../../config/colours';
import mediaQueries from '../../../config/mediaQueries';

export default css`
	.icon {
		color: ${colours.peppermint};
		font-size: 2.6rem;
		position: absolute;
		right: 0;
		top: 8px;
	}

	.select {
		background: none;
		border: none;
		border-bottom: 2px solid ${colours.white};
		color: ${colours.white};
		font-size: 2.6rem;
		height: 50px;
		outline: none;
		position: relative;
		transition: border-color 0.3s ease;
		width: 100%;
		-webkit-appearance: none;
		-moz-appearance: none;
		text-indent: 1px;
		text-overflow: '';
		z-index: 1;
	}

	.select::-ms-expand {
		display: none;
	}

	.select:focus {
		border-bottom-color: ${colours.peppermint};
	}

	.select option {
		color: ${colours.black};
		font-size: 1.6rem;
	}
`;
