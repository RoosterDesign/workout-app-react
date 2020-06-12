import css from 'styled-jsx/css';
import colours from '../../config/colours';
import mediaQueries from '../../config/mediaQueries';

export default css`
	.notification {
		animation-name: slideDownUp;
		animation-duration: 3s;
		align-items: center;
		display: flex;
		font-size: 2rem;
		height: 60px;
		justify-content: center;
		left: 0;
		position: fixed;
		top: -60px;
		width: 100%;
		z-index: 99999;
	}

	.success {
		background: ${colours.peppermint};
		color: ${colours.darkGreen};
	}

	.error {
		background: ${colours.red};
		color: ${colours.white};
	}

	.icon {
		align-items: center;
		border-width: 2px;
		border-style: solid;
		border-radius: 50%;
		display: flex;
		font-size: 1.4rem;
		justify-content: center;
		height: 28px;
		margin-right: 8px;
		width: 28px;
	}

	.success .icon {
		border-color: ${colours.darkGreen};
	}

	.error .icon {
		border-color: ${colours.white};
	}

	@keyframes slideDownUp {
		0% {
			top: -70px;
		}
		10% {
			top: 0;
		}
		90% {
			top: 0;
		}
		100% {
			top: -70px;
		}
	}
`;
