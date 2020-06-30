import css from 'styled-jsx/css';
import colours from '../../config/colours';
import mediaQueries from '../../config/mediaQueries';

export default css`
	.registerForm {
		margin: 50px auto 0;
		max-width: 500px;
		width: 100%;
	}

	.errors {
		color: ${colours.red};
		font-size: 1.6rem;
		line-height: 1.5;
		margin: 0 0 20px;
		text-align: center;
	}

	@media ${mediaQueries.tablet} {
		.registerForm {
			margin-top: 100px;
		}
	}
`;
