/* eslint-disable react/prop-types */
import { AddBoxOutlined } from '@mui/icons-material';
import {
	Box,
	IconButton,
	ListItem,
	ListItemButton,
	Typography,
} from '@mui/material';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router';
import { Link } from 'react-router-dom';
import boardApi from '../../api/boardApi';

/*
	boards: data from API
	setBoards: action redux
	reducer: name reducer

*/
const BoardList = ({ data, setBoards, reducer, nameBoard }) => {
	const [activeIndex, setActiveIndex] = useState(0);

	const { boardId } = useParams();
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const boards = useSelector((state) => state[reducer].value);

	const handleAddBoard = async () => {
		const response = await boardApi.createBoard({
			favourite: nameBoard === 'Boards' ? false : true,
		});
		const newList = [response.board, ...boards];
		dispatch(setBoards(newList));
		navigate(`/boards/${response.board.id}`);
	};

	const handleDragEnd = async ({ source, destination }) => {
		const newList = [...boards];
		const [removed] = newList.splice(source.index, 1);

		newList.splice(destination.index, 0, removed); // splice : remove, insert and replace element

		const activeItem = newList.findIndex((item) => item.id === boardId);
		setActiveIndex(activeItem);
		dispatch(setBoards(newList));

		try {
			if (nameBoard === 'Boards') {
				await boardApi.updatePosition(newList);
			} else {
				await boardApi.updateFavouriteBoard(newList);
			}
		} catch (err) {
			alert(err);
		}
	};

	useEffect(() => {
		dispatch(setBoards(data.boards));
	}, [data.boards, dispatch, setBoards]);

	useEffect(() => {
		if (boards?.length > 0) {
			const activeItem = boards.find((item) => item.id === boardId);
			setActiveIndex(activeItem);
		}
	}, [boards, boardId]);

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
						{nameBoard}
					</Typography>
					<IconButton onClick={handleAddBoard}>
						<AddBoxOutlined />
					</IconButton>
				</Box>
			</ListItem>
			{/* ALL BOARDS */}
			{boards?.length > 0 && (
				<DragDropContext onDragEnd={handleDragEnd}>
					<Droppable
						key={'list-board-droppable-key'}
						droppableId={'list-board-droppable'}
					>
						{(provided) => (
							<div ref={provided.innerRef} {...provided.droppableProps}>
								{boards?.map((item, index) => (
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

export default BoardList;
