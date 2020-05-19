import React, { useState, useCallback } from 'react';
import Card from './Card';
import update from 'immutability-helper';

const SortableCardList = ({ data, handleTestClick }) => {
	const style = {
		width: 400,
	};

	const [cards, setCards] = useState(data);

	const moveCard = useCallback(
		(dragIndex, hoverIndex) => {
			const dragCard = cards[dragIndex];
			setCards(
				update(cards, {
					$splice: [
						[dragIndex, 1],
						[hoverIndex, 0, dragCard],
					],
				})
			);
		},
		[cards]
	);

	const dropCard = useCallback(
		(item) => {
			console.log('item: ', item);

			const updatedState = [...cards];
			updatedState.filter((cardItem) => {
				if (cardItem.id === item.id) {
					cardItem.order = item.index;
					setCards([...updatedState]);
				}
			});
		},
		[cards]
	);

	// const updateList = () => {
	// const updatedState = [...cards];
	// for (let i = 0; i < updatedState.length; i++) {
	// 	updatedState[i].order = i;
	// }
	// setCards([...updatedState]);
	// };

	const renderCard = (card, index) => {
		return <Card key={card.id} index={index} id={card.id} text={card.name} moveCard={moveCard} dropCard={dropCard} />;
	};

	return (
		<>
			{console.log('cards updated: ')}
			<div style={style}>{cards.map((card, i) => renderCard(card, i))}</div>
			<button type="button" onClick={(e) => handleTestClick(e, cards)}>
				SAVE
			</button>
		</>
	);
};

export default SortableCardList;
