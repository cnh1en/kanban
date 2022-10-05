import { Button, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import authApi from '../api/authApi';

const Register = () => {
	const [inputForm, setInputForm] = useState({
		username: '',
		password: '',
		password_confirmation: '',
	});
	const [match, setMatch] = useState(true);

	const navigate = useNavigate();

	const handleMatchPassword = (e) => {
		if (inputForm.password !== e.target.value) {
			setMatch(false);
		} else {
			setMatch(true);
		}
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		// eslint-disable-next-line no-unused-vars
		const { password_confirmation, ...data } = inputForm;
		await authApi.register(data);
		setInputForm({
			...inputForm,
			username: '',
			password: '',
			password_confirmation: '',
		});
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

			<TextField
				margin="normal"
				required
				fullWidth
				id="password_confirmation"
				label="Password confirmation"
				name="password_confirmation"
				type="password"
				error={!match}
				helperText={
					!match && (
						<Typography
							sx={{
								color: 'red',
							}}
						>
							This password doesn't match
						</Typography>
					)
				}
				onChange={(e) => {
					setInputForm({ ...inputForm, password_confirmation: e.target.value });
					handleMatchPassword(e);
				}}
			/>

			<Button
				type="submit"
				fullWidth
				variant="contained"
				disabled={
					inputForm.username.length === 0 ||
					inputForm.password.length === 0 ||
					inputForm.password_confirmation === 0 ||
					!match
				}
			>
				Sign up
			</Button>

			<Button
				component="Link"
				fullWidth
				variant="text"
				sx={{
					marginTop: '15px',
				}}
				onClick={() => navigate('/login')}
			>
				You have an account ? Sign in
			</Button>
		</Box>
	);
};

export default Register;
