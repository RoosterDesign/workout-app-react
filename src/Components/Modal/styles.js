import css from 'styled-jsx/css';
import colours from '../../config/colours';
import mediaQueries from '../../config/mediaQueries';

export default css`
	.mask {
		align-items: center;
		background: rgba(0, 0, 0, 0.8);
		display: flex;
		height: 100%;
		justify-content: center;
		left: 0;
		position: fixed;
		top: 0;
		width: 100%;
		z-index: 99998;
	}

	.modal {
		align-items: center;
		background: ${colours.peppermint};
		border-radius: 4px;
		display: flex;
		justify-content: center;
		flex-direction: column;
		max-width: 90%;
		padding: 30px;
		width: 100%;
	}

	.icon {
		align-items: center;
		border: 2px solid ${colours.white};
		border-radius: 50%;
		display: flex;
		font-size: 3.6rem;
		justify-content: center;
		height: 70px;
		margin-bottom: 5px;
		width: 70px;
	}

	.title {
		color: ${colours.white};
		font-size: 3.6rem;
		margin-bottom: 8px;
	}

	.body {
		color: ${colours.white};
		font-size: 2rem;
	}

	.btn {
		background: none;
		border: 2px solid ${colours.white};
		border-radius: 40px;
		color: ${colours.white};
		display: block;
		font-size: 2.4rem;
		font-weight: 300;
		height: 50px;
		margin-top: 20px;
		outline: none;
		width: 100%;
	}
`;
