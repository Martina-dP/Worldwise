import { configureStore } from '@reduxjs/toolkit';
import rootReducer from '../reducer/reducer';

const store = configureStore({
    reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;