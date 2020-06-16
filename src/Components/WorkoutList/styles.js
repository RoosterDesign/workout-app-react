import css from 'styled-jsx/css';
import colours from '../../config/colours';
import mediaQueries from '../../config/mediaQueries';

export default css`
	.workoutList :global(.listItem) {
		min-height: 0;
		padding: 0;
	}

	.workoutList :global(.workoutLink) {
		align-items: center;
		color: ${colours.white};
		display: flex;
		font-size: 2.2rem;
		justify-content: space-between;
		min-height: 80px;
		padding: 20px 0;
		text-decoration: none;
		width: 100%;
	}

	@media ${mediaQueries.tablet} {
		.workoutList :global(.workoutLink) {
			font-size: 3rem;
		}
	}
`;
