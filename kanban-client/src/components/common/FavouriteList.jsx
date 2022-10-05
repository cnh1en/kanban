import { AddBoxOutlined } from '@mui/icons-material';
import {
	Box,
	IconButton,
	ListItem,
	ListItemButton,
	Typography,
} from '@mui/material';
import React, { useState } from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import boardApi from '../../api/boardApi';
import { useFetch } from '../../hooks/useFetch';

const FavouriteList = () => {
	const [activeIndex, setActiveIndex] = useState(0);

	const { boardId } = useParams();
	const dispatch = useDispatch();
	const favouriteList = useSelector((state) => state.favourite.value);

	const { data: favourites } = useFetch(`favourite-${boardId}`, () =>
		boardApi.getFavouriteBoards()
	);

	const handleAddBoard = () => {};

	const handleDragEnd = () => {};

	return (
		<>
			<ListItem>
				<Box
					sx={{
						width: '100%',
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'space-between',
					}}
				>
					<Typography variant="body2" fontWeight={700}>
						Favorite
					</Typography>
					<IconButton onClick={handleAddBoard}>
						<AddBoxOutlined />
					</IconButton>
				</Box>
			</ListItem>
			{/* ALL BOARDS */}
			{favourites?.length > 0 && (
				<DragDropContext onDragEnd={handleDragEnd}>
					<Droppable
						key={'list-board-droppable-key'}
						droppableId={'list-board-droppable'}
					>
						{(provided) => (
							<div ref={provided.innerRef} {...provided.droppableProps}>
								{favourites.map((item, index) => (
									<Draggable
										key={item.id}
										draggableId={item.id.toString()}
										index={index}
									>
										{(provided, snapshot) => (
											<ListItemButton
												ref={provided.innerRef}
												{...provided.dragHandleProps}
												{...provided.draggableProps}
												selected={index === activeIndex}
												component={Link}
												to={`/boards/${item.id}`}
												sx={{
													pl: '20px',
													cursor: snapshot.isDragging
														? 'grab'
														: 'pointer!important',
												}}
											>
												<Typography
													variant="body2"
													fontWeight="700"
													sx={{
														whiteSpace: 'nowrap',
														overflow: 'hidden',
														textOverflow: 'ellipsis',
													}}
												>
													{item.icon} {item.title}
												</Typography>
											</ListItemButton>
										)}
									</Draggable>
								))}
								{provided.placeholder}
							</div>
						)}
					</Droppable>
				</DragDropContext>
			)}
		</>
	);
};

export default FavouriteList;
