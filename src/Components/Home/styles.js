import css from 'styled-jsx/css';

export default css`
	.container {
		align-items: center;
		display: flex;
		flex-wrap: wrap;
		height: 100%;
		/* justify-content: center; */
		justify-content: space-between;
		width: 100%;
	}

	.alignCenter {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		margin: auto;
		width: 100%;
	}

	.halfWidth {
		margin-top: 20px;
		width: calc(50% - 10px);
	}
`;
