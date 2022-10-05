/* eslint-disable react/prop-types */
import React from 'react';
import { Box, CircularProgress } from '@mui/material';

const Loading = ({ fullHeight }) => {
	return (
		<Box
			flex
			alignContent="center"
			justifyContent="center"
			sx={{
				width: '100%',
				height: fullHeight ? '100vh' : '100%',
			}}
		>
			<CircularProgress />
		</Box>
	);
};

export default Loading;
