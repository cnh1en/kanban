import axiosClient from './axiosClient';

const authApi = {
	login: (data) => axiosClient.post('auth/login', data),
	logout: () => axiosClient.post('auth/logout'),
	register: (params) => axiosClient.post('auth/register', params),
	me: () => axiosClient.get('auth/me'),
};

export default authApi;
