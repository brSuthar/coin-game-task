import {configureStore} from '@reduxjs/toolkit';
import history from './history.slice';

const store = configureStore({
  reducer: {
    history: history,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
