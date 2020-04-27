import css from 'styled-jsx/css';
import colours from '../../config/colours';
import mediaQueries from '../../config/mediaQueries';

export default css`
	table {
		border-spacing: 10px;
		border-collapse: separate;
		margin: 0 auto;
		width: 1200px;
	}
	td {
		border: 1px solid white;
	}
	.active {
		background-color: teal;
		color: white;
	}
	.done {
		background-color: green;
		color: white;
	}
`;
