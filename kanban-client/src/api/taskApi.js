import axiosClient from './axiosClient';

const taskApi = {
	createTask: (sectionId) => axiosClient.post(`tasks/${sectionId}`),
	updateTask: (taskId, data) => axiosClient.patch(`tasks/${taskId}`, data),
	removeTask: (taskId) => axiosClient.delete(`tasks/${taskId}`),
	updatePosition: (data) => axiosClient.patch('tasks/update-position', data),
};

export default taskApi;
