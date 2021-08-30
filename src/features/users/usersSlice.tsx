import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from '../../app/store';

export interface UsersState {
    usersList: Array<object>;
    status: 'idle' | 'loading' | 'failed';
}

const initialState: UsersState = {
  usersList: [],
  status: 'idle',
};

const endpoint = (options: { limit: number; page: number; gender: string; }) => `https://randomuser.me/api/?results=${options.limit}&page=${options.page}&gender=${options.gender}`;

export const fetchUsersList = createAsyncThunk('', async (options: { limit: number; page: number; gender: string; }) => await axios.get(endpoint(options)));

export const usersList = createSlice({
  name: 'usersList',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsersList.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchUsersList.fulfilled, (state, action) => {
        state.status = 'idle';
        // @ts-ignore
        state.usersList = action.payload?.data?.results?.map(value => ({
          id: value.id,
          gender: value.gender,
          avatar: value.avatar,
          fullName: value.name.first + ' ' + value.name.last,
          city: value.location.city,
          address: value.location.street.name + ', ' + value.location.street.number,
          email: value.email,
        }));
      });
  },
});

export const getUsersList = (state: RootState) => state.usersList.usersList;

export default usersList.reducer;
