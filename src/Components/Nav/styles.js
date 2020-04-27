import css from 'styled-jsx/css';
import colours from '../../config/colours';
import mediaQueries from '../../config/mediaQueries';

export default css`
	nav {
		left: 30px;
		position: absolute;
		top: 30px;
	}
	nav > :global(.btn) {
		color: ${colours.white};
		font-size: 4em;
	}
`;
