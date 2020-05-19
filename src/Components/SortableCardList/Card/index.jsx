import React, { useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';

const Card = ({ id, text, index, moveCard, dropCard }) => {
	const style = {
		color: 'black',
		backgroundColor: 'white',
		cursor: 'move',
		border: '1px solid red',
		fontSize: '15px',
		marginBottom: '10px',
		padding: '20px',
	};

	const ref = useRef(null);
	const [, drop] = useDrop({
		accept: 'card',

		drop(props, monitor, component) {
			if (monitor.didDrop()) {
				// If you want, you can check whether some nested
				// target already handled drop
				return;
			}

			// Obtain the dragged item
			const item = monitor.getItem();

			// You can do something with it
			dropCard(item);

			// You can also do nothing and return a drop result,
			// which will be available as monitor.getDropResult()
			// in the drag source's endDrag() method
			return { moved: true };
		},

		hover(item, monitor) {
			if (!ref.current) {
				return;
			}
			const dragIndex = item.index;
			const hoverIndex = index;
			if (dragIndex === hoverIndex) {
				return;
			}
			const hoverBoundingRect = ref.current.getBoundingClientRect();
			const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
			const clientOffset = monitor.getClientOffset();
			const hoverClientY = clientOffset.y - hoverBoundingRect.top;
			if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
				return;
			}
			if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
				return;
			}
			moveCard(dragIndex, hoverIndex);
			item.index = hoverIndex;
		},
	});
	const [{ isDragging }, drag] = useDrag({
		item: { type: 'card', id, index },
		collect: (monitor) => ({
			isDragging: monitor.isDragging(),
		}),
	});
	const opacity = isDragging ? 0 : 1;
	drag(drop(ref));
	return (
		<div ref={ref} style={{ ...style, opacity }}>
			{text}
		</div>
	);
};

export default Card;
