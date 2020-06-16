import css from 'styled-jsx/css';
import colours from '../../config/colours';
import mediaQueries from '../../config/mediaQueries';

export default css`
	footer {
		flex: 0;
		overflow: hidden;
		margin: 0 auto;
		max-width: none;
		padding: 20px;
		text-align: right;
		width: 100%;
	}
	.version {
		color: ${colours.darkGrey};
		font-size: 1.8rem;
	}

	@media ${mediaQueries.tablet} {
		footer {
			padding-top: 40px;
		}
	}
`;
