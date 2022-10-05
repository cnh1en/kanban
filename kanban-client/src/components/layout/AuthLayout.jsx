import { Box, Container } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router';
import authUtils from '../../utils/authUtils';
import Loading from '../common/Loading';
import darkLogo from '../../assets/images/darkLogo.png';

const AuthLayout = () => {
	const [isLoading, setIsLoading] = useState(false);
	const navigate = useNavigate();

	useEffect(() => {
		const checkAuth = async () => {
			const isAuth = await authUtils.isAuthenticated();
			if (!isAuth) {
				setIsLoading(false);
			} else {
				navigate('/');
			}
		};

		checkAuth();
	}, []);

	if (isLoading) {
		return <Loading fullHeight />;
	}

	return (
		<Container component="main" maxWidth="xs">
			<Box
				marginTop={8}
				alignItems="center"
				flexDirection="column"
				sx={{
					display: 'flex',
				}}
			>
				<img src={darkLogo} style={{ width: '100px' }} alt="app-logo" />
				<Outlet />
			</Box>
		</Container>
	);
};

export default AuthLayout;
