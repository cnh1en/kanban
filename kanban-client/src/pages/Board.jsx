import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import StarBorderOutlinedIcon from '@mui/icons-material/StarBorderOutlined';
import StarOutlinedIcon from '@mui/icons-material/StarOutlined';
import { Box, IconButton, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router';
import boardApi from '../api/boardApi';
import ClickAwayListener from '../components/common/ClickAwayListener';
import EmojiPicker from '../components/common/EmojiPicker';
import Kanban from '../components/common/Kanban';
import { useFetch } from '../hooks/useFetch';
import { addBoard, removeBoard, setBoard } from '../redux/features/boardSlice';
import {
	addFavourite,
	removeFavourite,
	setFavouriteBoard,
} from '../redux/features/favouriteSlice';

const TIME_OUT = 1000;
let timer;

const Board = () => {
	const [isShowEmojiPicker, setIsShowEmojiPicker] = useState(false);
	const [icon, setIcon] = useState('');
	const [title, setTitle] = useState('');
	const [description, setDescription] = useState('');
	const [isFavorite, setIsFavorite] = useState(false);

	const { boardId } = useParams();
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const { data } = useFetch(`board-${boardId}`, () =>
		boardApi.getBoard(boardId)
	);
	const board = useSelector((state) => state.board);
	const favourite = useSelector((state) => state.favourite);

	const onIconChange = async (newIcon) => {
		let selectedBoard;
		if (isFavorite) {
			selectedBoard = favourite?.value.find((item) => item.id == boardId);
			dispatch(
				setFavouriteBoard({
					newBoard: { ...selectedBoard, icon: newIcon },
				})
			);

			try {
				await boardApi.updateBoard(Number(boardId), { icon: newIcon });
			} catch (error) {
				alert(error);
			}

			return;
		}

		selectedBoard = board?.value.find((item) => item.id == boardId);
		dispatch(
			setBoard({
				newBoard: { ...selectedBoard, icon: newIcon },
			})
		);

		try {
			await boardApi.updateBoard(Number(boardId), { icon: newIcon });
		} catch (error) {
			alert(error);
		}
	};

	const updateTitle = async (e) => {
		clearTimeout(timer);
		setTitle(e.target.value);

		if (isFavorite) {
			const selectedFavouriteBoard = favourite?.value.find(
				(item) => item.id == boardId
			);
			dispatch(
				setFavouriteBoard({
					newBoard: { ...selectedFavouriteBoard, title: e.target.value },
				})
			);
		} else {
			const selectedBoard = board?.value.find((item) => item.id == boardId);
			dispatch(
				setBoard({
					newBoard: { ...selectedBoard, title: e.target.value },
				})
			);
		}

		timer = setTimeout(async () => {
			await boardApi.updateBoard(Number(boardId), {
				title: e.target.value,
			});
		}, TIME_OUT);
	};

	const updateDescription = async (e) => {
		clearTimeout(timer); // clear previous timer
		setDescription(e.target.value);
		timer = setTimeout(async () => {
			await boardApi.updateBoard(Number(boardId), {
				description: e.target.value,
			});
		}, TIME_OUT);
	};

	const addFavouriteBoard = async () => {
		if (isFavorite) {
			const selectedFavouriteBoard = favourite?.value.find(
				(item) => item.id == boardId
			);
			dispatch(removeFavourite(boardId));
			dispatch(addBoard({ ...selectedFavouriteBoard, favourite: false }));
		} else {
			const selectedBoard = board?.value.find((item) => item.id == boardId);
			dispatch(removeBoard(boardId));
			dispatch(addFavourite({ ...selectedBoard, favourite: true }));
		}
		const updatePosition = isFavorite
			? {
					position: -(board.length + 1),
			  }
			: {
					favourite_position: -(favourite.length + 1),
			  };

		await boardApi.updateBoard(Number(boardId), {
			favourite: !isFavorite,
			updatePosition,
		});
	};

	const deleteBoard = async () => {
		if (isFavorite) {
			dispatch(removeFavourite(boardId));
		} else {
			dispatch(removeBoard(boardId));
		}
		await boardApi.delete(Number(boardId));
		navigate('/');
	};

	useEffect(() => {
		if (data) {
			setIcon(data?.board?.icon);
			setTitle(data?.board?.title);
			setDescription(data?.board?.description);
			setIsFavorite(data?.board?.favourite);
		}
	}, [boardId, data]);

	return (
		<Box sx={{ width: '100%' }}>
			<Box
				sx={{
					display: 'flex',
					justifyContent: 'space-between',
				}}
			>
				<IconButton
					variant="outlined"
					onClick={() => {
						setIsFavorite((prev) => !prev);
						addFavouriteBoard();
					}}
				>
					{isFavorite ? (
						<StarOutlinedIcon
							color="warning"
							sx={{
								'& > path': {
									color: 'yellow',
								},
							}}
						/>
					) : (
						<StarBorderOutlinedIcon />
					)}
				</IconButton>
				<IconButton variant="outlined" onClick={deleteBoard}>
					<DeleteOutlinedIcon />
				</IconButton>
			</Box>

			<Box sx={{ padding: '10px 50px' }}>
				<Box sx={{ display: 'flex', position: 'relative' }} alignItems="center">
					<Box
						sx={{ fontSize: '24px', cursor: 'pointer', marginRight: '10px' }}
						onClick={(e) => {
							setIsShowEmojiPicker(!isShowEmojiPicker);
							e.stopPropagation();
						}}
					>
						{icon}
					</Box>
					{isShowEmojiPicker && (
						<ClickAwayListener onClickAway={() => setIsShowEmojiPicker(false)}>
							<EmojiPicker setIcon={setIcon} onIconChange={onIconChange} />
						</ClickAwayListener>
					)}
					<TextField
						value={title}
						placeholder="Untitled"
						variant="outlined"
						fullWidth
						onChange={updateTitle}
						sx={{
							'& .MuiOutlinedInput-input': { padding: 0 },
							'& .MuiOutlinedInput-notchedOutline': { border: 'unset ' },
							'& .MuiOutlinedInput-root': {
								fontSize: '2rem',
								fontWeight: '700',
							},
						}}
					/>
				</Box>

				<TextField
					value={description}
					placeholder="Add a description"
					variant="outlined"
					multiline
					fullWidth
					onChange={updateDescription}
					sx={{
						'& .MuiOutlinedInput-input': { padding: 0 },
						'& .MuiOutlinedInput-notchedOutline': { border: 'unset ' },
						'& .MuiOutlinedInput-root': { fontSize: '0.8rem' },
					}}
				/>
			</Box>

			<Kanban
				data={data?.board.sections}
				boardId={boardId}
				boards={data?.board}
			/>
		</Box>
	);
};

export default Board;
