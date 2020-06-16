import css from 'styled-jsx/css';
import colours from '../../config/colours';
import mediaQueries from '../../config/mediaQueries';

export default css`
	.card {
		align-items: center;
		border: 1px solid ${colours.white};
		border-radius: 4px;
		color: ${colours.white};
		display: flex;
		min-height: 55px;
		justify-content: space-between;
		font-size: 1.8rem;
		margin-top: 15px;
		padding: 8px 15px;
	}

	.card:first-of-type {
		margin-top: 0;
	}

	.isDragging {
		opacity: 0.5;
	}

	.icon {
		font-size: 1.6rem;
	}

	@media ${mediaQueries.tablet} {
		.card {
			min-height: 60px;
			font-size: 2.2rem;
		}
		.icon {
			font-size: 2.2rem;
		}
	}
`;
