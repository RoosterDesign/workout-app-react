import React, { useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrows, faPencilAlt, faTrash } from '@fortawesome/pro-solid-svg-icons';
import classNames from 'classnames';
import styles from './styles';

const Card = ({ id, name, index, moveCard }) => {
	const ref = useRef(null);
	const [, drop] = useDrop({
		accept: 'card',
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
	const opacity = isDragging ? 0.5 : 1;
	drag(drop(ref));
	return (
		<div
			ref={ref}
			className={classNames({
				card: true,
				isDragging: isDragging,
			})}
		>
			{name}
			<div className="icon">
				<FontAwesomeIcon icon={faArrows} />
			</div>
			<style jsx>{styles}</style>
		</div>
	);
};

export default Card;
