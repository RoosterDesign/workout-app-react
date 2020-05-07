import css from 'styled-jsx/css';
import colours from '../../config/colours';
import mediaQueries from '../../config/mediaQueries';

export default css`
	.listItem {
		align-items: center;
		border-bottom: 1px solid ${colours.white};
		display: inline-flex;
		min-height: 80px;
		padding: 20px 0;
		justify-content: space-between;
		width: 100%;
	}

	.listItem:first-of-type {
		margin-top: -20px;
	}

	.listItem:last-child {
		border: none;
	}

	.listItem :global(.name) {
		font-size: 2.2rem;
	}

	.listItem :global(.controls) {
		display: inline-flex;
		margin-bottom: auto;
		margin-left: auto;
		padding-left: 20px;
	}

	.listItem :global(.roundIconBtn) {
		margin-left: 12px;
	}
`;
