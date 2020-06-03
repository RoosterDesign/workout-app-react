import css from 'styled-jsx/css';
import colours from '../../config/colours';
import mediaQueries from '../../config/mediaQueries';

export default css`
	:global(.roundIconBtn) {
		align-items: center;
		background: none;
		border: 2px solid ${colours.peppermint};
		border-radius: 50%;
		color: ${colours.peppermint};
		display: flex;
		font-size: 1.9rem;
		justify-content: center;
		height: 42px;
		outline: none;
		width: 42px;
	}
`;
