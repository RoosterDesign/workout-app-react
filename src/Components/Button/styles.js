import css from 'styled-jsx/css';
import colours from '../../config/colours';
import mediaQueries from '../../config/mediaQueries';

export default css`
	.btnContainer {
		width: 100%;
	}

	.btnContainer > :global(.btn) {
		align-items: center;
		display: flex;
		justify-content: center;
		text-decoration: none;
		text-transform: uppercase;
	}

	.btnContainer > :global(.btn.outline) {
		border: 2px solid ${colours.peppermint};
		color: ${colours.peppermint};
	}

	.btnContainer > :global(.btn.solid) {
		background: ${colours.peppermint};
		color: ${colours.darkGreen};
	}

	.btnContainer > :global(.btn.large) {
		border-radius: 40px;
		font-size: 3rem;
		height: 80px;
	}

	.btnContainer > :global(.btn.small) {
		border-radius: 25px;
		font-size: 2.4rem;
		height: 50px;
	}

	@media ${mediaQueries.tablet} {
		.btnContainer > :global(.btn.large) {
			border-radius: 68px;
			font-size: 4rem;
			height: 136px;
		}
		.btnContainer > :global(.btn.small) {
			border-radius: 30px;
			font-size: 3.4rem;
			height: 60px;
		}
	}
`;
