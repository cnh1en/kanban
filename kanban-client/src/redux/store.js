import { configureStore } from '@reduxjs/toolkit';
import userReducer from './features/userSlice';
import boardReducer from './features/boardSlice';
import favouriteReducer from './features/favouriteSlice';
import sectionReducer from './features/sectionSlice';
import taskReducer from './features/taskSlice';

export const store = configureStore({
	reducer: {
		user: userReducer,
		board: boardReducer,
		favourite: favouriteReducer,
		section: sectionReducer,
		task: taskReducer,
	},
});
