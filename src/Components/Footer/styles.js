import css from 'styled-jsx/css';
import colours from '../../config/colours';
import mediaQueries from '../../config/mediaQueries';

export default css`
	.container {
		flex: 0;
		overflow: hidden;
		padding-top: 20px;
		padding-bottom: 20px;
		text-align: right;
	}
	.version {
		color: ${colours.darkGrey};
		font-size: 1.8rem;
	}
`;
