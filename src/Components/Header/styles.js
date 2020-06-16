import css from 'styled-jsx/css';
import colours from '../../config/colours';
import mediaQueries from '../../config/mediaQueries';

export default css`
	header {
		align-items: center;
		display: flex;
		flex: 0;
		height: 60px;
		justify-content: space-between;
		left: 0;
		margin: 0 auto 60px;
		padding: 0 20px;
		position: fixed;
		top: 0;
		z-index: 999;
		width: 100%;
	}

	.hasScrolled {
		background: rgba(0, 0, 0, 0.95);
	}
`;
