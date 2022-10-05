import { Stack } from '@mui/material';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Outlet, useNavigate } from 'react-router';
import { setUser } from '../../redux/features/userSlice';
import authUtils from '../../utils/authUtils';
import Sidebar from '../common/Sidebar';

const AppLayout = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	useEffect(() => {
		const checkAuth = async () => {
			const user = await authUtils.isAuthenticated();
			if (!user) {
				navigate('/login');
			} else {
				dispatch(setUser(user));
			}
		};

		checkAuth();
	}, []);

	return (
		<Stack direction="row" spacing={3}>
			<Sidebar />
			<Outlet />
		</Stack>
	);
};

export default AppLayout;
