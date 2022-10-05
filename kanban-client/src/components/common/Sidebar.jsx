import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import {
	Box,
	Drawer,
	IconButton,
	List,
	ListItem,
	Typography,
} from '@mui/material';
import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router';
import authApi from '../../api/authApi';
import boardApi from '../../api/boardApi';
import assets from '../../assets';
import { useFetch } from '../../hooks/useFetch';
import { setBoards } from '../../redux/features/boardSlice';
import { setFavouriteBoards } from '../../redux/features/favouriteSlice';
import BoardList from './BoardList';

const Sidebar = () => {
	const sidebarWidth = 300;

	const { boardId } = useParams();
	const currentUser = useSelector((state) => state.user.value);

	const { data: favourites } = useFetch(`favourites-${boardId}`, () =>
		boardApi.getFavouriteBoards()
	);
	const { data: all } = useFetch(`all-${boardId}`, () => boardApi.getBoards());

	const handleLogout = async () => {
		await authApi.logout();
		localStorage.removeItem('token');
		window.location.href = '/login';
	};

	return (
		<Drawer
			container={window.document.body}
			variant="permanent"
			open={true}
			sx={{
				width: sidebarWidth,
				height: '100vh',
				overflow: 'auto',
				'& > div': {
					borderRight: 'none',
				},
			}}
		>
			<List
				disablePadding
				sx={{
					width: sidebarWidth,
					height: '100vh',
					backgroundColor: assets.colors.secondary,
				}}
			>
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
							{currentUser.username}
						</Typography>
						<IconButton onClick={handleLogout}>
							<LogoutOutlinedIcon />
						</IconButton>
					</Box>
				</ListItem>

				{!!favourites && (
					<BoardList
						data={favourites}
						setBoards={setFavouriteBoards}
						reducer="favourite"
						nameBoard="Favourites"
					/>
				)}

				{!!all && (
					<BoardList
						data={all}
						setBoards={setBoards}
						reducer="board"
						nameBoard="Boards"
					/>
				)}
			</List>
		</Drawer>
	);
};

export default Sidebar;
