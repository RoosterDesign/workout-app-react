import css from 'styled-jsx/css';
import colours from '../../config/colours';
import mediaQueries from '../../config/mediaQueries';

export default css`
	nav {
		background: #1c1e23;
		display: flex;
		min-height: 10vh;
		align-items: center;
		justify-content: center;
		padding: 0 50px;
	}

	ul {
		align-items: center;
		display: flex;
		list-style: none;
		justify-content: space-between;
		margin: 0;
		padding: 0;
		width: 100%;
	}

	li {
		margin: 0;
		font-weight: bold;
		padding: 0;
	}
`;
