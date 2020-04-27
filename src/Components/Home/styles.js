import css from 'styled-jsx/css';
import colours from '../../config/colours';
import mediaQueries from '../../config/mediaQueries';

export default css`
	.container {
		align-items: center;
		display: flex;
		flex-wrap: wrap;
		height: 100%;
		justify-content: center;
		width: 100%;
	}

	.container > div {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		max-width: 1000px;
		margin: auto;
		width: 100%;
	}

	.btnContainer {
		height: 75px;
		width: calc(50% - 16px);
	}

	.btnContainer > :global(.btn) {
		align-items: center;
		background: ${colours.white};
		border-radius: 5px;
		color: ${colours.midBlack};
		display: flex;
		font-size: 2em;
		justify-content: center;
		height: 100%;
		text-decoration: none;
	}

	.btnContainer.-large {
		height: 140px;
		margin-bottom: 32px;
		width: 100%;
	}

	.btnContainer.-large > :global(.btn) {
		font-size: 4em;
		font-weight: bold;
	}
`;
