/* eslint-disable react/react-in-jsx-scope */
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AppLayout from './components/layout/AppLayout';
import AuthLayout from './components/layout/AuthLayout';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import Board from './pages/Board';

function App() {
	const theme = createTheme({
		palette: {
			mode: 'dark',
		},
	});

	return (
		<ThemeProvider theme={theme}>
			<CssBaseline />
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<AuthLayout />}>
						<Route path="login" element={<Login />} />
						<Route path="register" element={<Register />} />
					</Route>

					<Route path="/" element={<AppLayout />}>
						<Route index element={<Home />} />
						<Route path="boards/:boardId" element={<Board />} />
					</Route>
				</Routes>
			</BrowserRouter>
		</ThemeProvider>
	);
}

export default App;
