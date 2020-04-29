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
		font-size: 3em;
		height: 80px;
	}

	.btnContainer > :global(.btn.small) {
		border-radius: 25px;
		font-size: 2.4em;
		height: 50px;
	}
`;
