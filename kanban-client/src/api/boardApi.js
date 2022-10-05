import axiosClient from './axiosClient';

const boardApi = {
	createBoard: (data) => axiosClient.post('boards', data),
	getBoards: () => axiosClient.get('boards'),
	updatePosition: (data) => axiosClient.patch('boards', data),
	getBoard: (boardId) => axiosClient.get(`boards/${boardId}`),
	updateBoard: (boardId, data) => axiosClient.patch(`boards/${boardId}`, data),
	getFavouriteBoards: () => axiosClient.get('boards/favourite'),
	updateFavouriteBoard: (data) => axiosClient.patch('boards/favourite', data),
	delete: (boardId) => axiosClient.delete(`boards/${boardId}`),
};

export default boardApi;
