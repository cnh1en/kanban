import { Box, Button, TextField } from '@mui/material';
import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import authApi from '../api/authApi';

const Login = () => {
	const [inputForm, setInputForm] = useState({
		username: '',
		password: '',
	});

	const navigate = useNavigate();

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const response = await authApi.login(inputForm);
			localStorage.setItem('token', response.authorization.token);
			navigate('/');
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<Box component="form" marginTop={1} noValidate onSubmit={handleSubmit}>
			<TextField
				margin="normal"
				required
				fullWidth
				id="username"
				label="Username"
				name="username"
				onChange={(e) =>
					setInputForm({ ...inputForm, username: e.target.value })
				}
			/>

			<TextField
				margin="normal"
				required
				fullWidth
				id="password"
				label="Password"
				name="password"
				type="password"
				onChange={(e) =>
					setInputForm({ ...inputForm, password: e.target.value })
				}
			/>

			<Button type="submit" fullWidth variant="contained">
				Log in
			</Button>

			<Button
				component="Link"
				fullWidth
				variant="text"
				sx={{
					marginTop: '15px',
				}}
				onClick={() => navigate('/register')}
			>
				Don't have an account ? Sign up
			</Button>
		</Box>
	);
};

export default Login;
