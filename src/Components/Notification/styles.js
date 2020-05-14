import css from 'styled-jsx/css';
import colours from '../../config/colours';
import mediaQueries from '../../config/mediaQueries';

export default css`
	.notification {
		/* animation-name: slideDownUp;
		animation-duration: 3s; */
		align-items: center;
		background: ${colours.peppermint};
		color: ${colours.darkGreen};
		display: flex;
		font-size: 2.4rem;
		height: 70px;
		justify-content: center;
		/* left: 0; */
		/* position: fixed; */
		/* top: -70px; */
		width: 100%;
		z-index: 99999;
	}

	.isHidden {
		background: red;
	}

	.icon {
		align-items: center;
		border: 2px solid ${colours.darkGreen};
		border-radius: 50%;
		display: flex;
		font-size: 1.8rem;
		justify-content: center;
		height: 30px;
		margin-right: 8px;
		width: 30px;
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
