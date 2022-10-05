import { createSlice } from '@reduxjs/toolkit';

const initialState = { value: null };

const favouriteSlice = createSlice({
	name: 'favourite',
	initialState,
	reducers: {
		setFavouriteBoards: (state, action) => {
			state.value = action.payload;
		},
		setFavouriteBoard: (state, action) => {
			const { newBoard } = action.payload;
			console.log({ newBoard });
			state.value = state.value.map((item) =>
				item.id == newBoard.id ? newBoard : item
			);
		},
		removeFavourite: (state, action) => {
			state.value = state.value.filter((item) => item.id != action.payload);
		},
		addFavourite: (state, action) => {
			state.value = [action.payload, ...state.value];
		},
	},
});

export const {
	setFavouriteBoards,
	setFavouriteBoard,
	removeFavourite,
	addFavourite,
} = favouriteSlice.actions;
export default favouriteSlice.reducer;
