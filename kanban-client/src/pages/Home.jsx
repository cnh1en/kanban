import { Box, Button } from '@mui/material';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router';
import boardApi from '../api/boardApi';
import { addBoard } from '../redux/features/boardSlice';

const Home = () => {
	const [activeIndex, setActiveIndex] = useState();

	const { boardId } = useParams();
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const currentUser = useSelector((state) => state.user.value);

	const createBoard = async () => {
		try {
			const response = await boardApi.createBoard({
				favourite: false,
			});
			dispatch(addBoard(response.board));
			navigate(`/boards/${response.board.id}`);
		} catch (error) {
			alert(error);
		}
	};

	return (
		<Box
			sx={{ height: '100vh', width: '100%', display: 'flex' }}
			alignItems="center"
			justifyContent="center"
		>
			<Button variant="outlined" color="success" onClick={createBoard}>
				Click here to create your first board
			</Button>
		</Box>
	);
};

export default Home;
