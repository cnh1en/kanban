import { createSlice } from '@reduxjs/toolkit';

const initialState = { value: {} };

const boardSlice = createSlice({
	name: 'board',
	initialState,
	reducers: {
		setBoards: (state, action) => {
			state.value = action.payload;
		},
		addBoard: (state, action) => {
			state.value = [action.payload, ...state.value];
		},
		setBoard: (state, action) => {
			const { newBoard } = action.payload;
			console.log({ newBoard });
			state.value = state.value.map((item) =>
				item.id === newBoard.id ? newBoard : item
			);
		},
		removeBoard: (state, action) => {
			state.value = state.value.filter((item) => item.id != action.payload);
		},
	},
});

export const { setBoards, addBoard, setBoard, removeBoard } =
	boardSlice.actions;
export default boardSlice.reducer;
