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
		height: 55px;
		justify-content: space-between;
		font-size: 2rem;
		margin-top: 15px;
		padding: 0 15px;
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
`;
