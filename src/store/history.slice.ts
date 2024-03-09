import {createSlice} from '@reduxjs/toolkit';

const initState = {
  list: [],
  win: 0,
  lost: 0,
};
const history = createSlice({
  initialState: initState,
  name: 'history',
  reducers: {
    saveGame(state, action) {
      state.list = [...state.list, action.payload];
      state.win = action.payload.status === 'win' ? state.win + 1 : state.win;
      state.lost =
        action.payload.status === 'lose' ? state.lost + 1 : state.lost;
    },
  },
});

export const {saveGame} = history.actions;
export default history.reducer;
