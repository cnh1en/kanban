import { createSlice } from '@reduxjs/toolkit';

const initialState = { value: {} };

const taskSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		setTasks: (state, action) => {
			state.value = action.payload;
		},
		addTask: (state, action) => {
			state.value.push(action.payload);
		},
		updateTask: (state, action) => {
			state.value = state.value.map((item) =>
				item.id == action.payload.id ? action.payload.newTask : item
			);
		},
	},
});

export const { setTasks, addTask, updateTask } = taskSlice.actions;
export default taskSlice.reducer;
