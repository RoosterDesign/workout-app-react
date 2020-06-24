import css from 'styled-jsx/css';
import colours from '../../config/colours';
import mediaQueries from '../../config/mediaQueries';

export default css`
	.error404 :global(.homeLink) {
		color: ${colours.white};
		font-size: 3.6rem;
		text-decoration: none;
	}
	.error404 :global(.homeLink:hover) {
		text-decoration: underline;
	}
`;
