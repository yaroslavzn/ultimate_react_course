import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  userName: '',
};

const userSlice = createSlice({
  name: 'user',
  reducers: {
    updateName: (state, action) => {
      state.userName = action.payload;
    },
  },
  initialState,
});

export const { updateName } = userSlice.actions;

export default userSlice.reducer;
