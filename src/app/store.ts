import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import profileReducer from '../features/profile/profileSlice';
import dashboardUsers from '../features/dashboard/dashboardSlice';
import usersList from '../features/users/usersSlice';

export const store = configureStore({
  reducer: {
    profile: profileReducer,
    users: dashboardUsers,
    usersList: usersList,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
