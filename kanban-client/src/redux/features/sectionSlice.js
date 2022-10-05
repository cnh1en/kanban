import { createSlice } from '@reduxjs/toolkit';

const initialState = { value: {} };

const sectionSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		setSections: (state, action) => {
			state.value = action.payload;
		},

		addSection: (state, action) => {
			state.value.push(action.payload);
		},

		removeSection: (state, action) => {
			state.value = state.value.filter((item) => item.id != action.payload);
		},
	},
});

export const { addSection, removeSection, setSections } = sectionSlice.actions;
export default sectionSlice.reducer;
