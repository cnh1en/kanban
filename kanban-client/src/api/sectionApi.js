import axiosClient from './axiosClient';

const sectionApi = {
	getSections: (boardId) => axiosClient.get(`sections/${boardId}`),
	createSection: (boardId) => axiosClient.post(`sections/${boardId}`),
	deleteSection: (sectionId) => axiosClient.delete(`sections/${sectionId}`),
	updateSection: (sectionId, data) =>
		axiosClient.patch(`sections/${sectionId}`, data),
};

export default sectionApi;
