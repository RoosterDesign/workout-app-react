import css from 'styled-jsx/css';
import colours from '../../config/colours';
import mediaQueries from '../../config/mediaQueries';

export default css`
	nav {
		max-width: 1900px;
		width: 100%;
	}
	nav > :global(.btn) {
		color: ${colours.white};
		font-size: 3.4rem;
	}

	nav > :global(.back) {
		background: none;
		border: none;
		float: left;
		padding: 0;
		outline: none;
	}

	nav > :global(.home) {
		float: right;
	}
`;
