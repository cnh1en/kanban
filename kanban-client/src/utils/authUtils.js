import authApi from '../api/authApi';

const authUtils = {
	isAuthenticated: async () => {
		const token = localStorage.getItem('token');
		if (!token) return false;
		try {
			const response = await authApi.me();
			console.log(response);
			return response.user;
		} catch (error) {
			return false;
		}
	},
};

export default authUtils;
