import css from 'styled-jsx/css';
import colours from '../../config/colours';
import mediaQueries from '../../config/mediaQueries';

export default css`
	.container {
		align-items: center;
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		margin-top: -60px;
		width: 100%;
	}

	.vAlignCenter {
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

	@media ${mediaQueries.tablet} {
		.container {
			max-width: 560px;
		}
		.halfWidth {
			margin-top: 30px;
			width: calc(50% - 15px);
		}
	}
	@media ${mediaQueries.desktop} {
		.container {
			max-width: 900px;
		}
	}
`;
