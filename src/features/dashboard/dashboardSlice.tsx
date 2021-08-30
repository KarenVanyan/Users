import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from '../../app/store';

export interface UsersState {
    dashboardUsers: Array<object>;
    status: 'idle' | 'loading' | 'failed';
}

const initialState: UsersState = {
  dashboardUsers: [],
  status: 'idle',
};

const limit = 200;
const page = 1;
const gender = '';

const endpoint = `https://randomuser.me/api/?results=${limit}&page=${page}&gender=${gender}`;

export const fetchDashboardUsers = createAsyncThunk('', async () => await axios.get(endpoint));

export const dashboardUsers = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDashboardUsers.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchDashboardUsers.fulfilled, (state, action) => {
        state.status = 'idle';
        // @ts-ignore
        state.dashboardUsers = action?.payload.data.results.reduce((acc, curr) => {
          const date = new Date(curr.registered.date);
          const month = date.getMonth() + 1;

          acc[month] = acc[month] + 1 || 1;

          return acc;
        }, {});
      });
  },
});

export const dashboardUsersSelector = (state: RootState) => state.users.dashboardUsers;

export default dashboardUsers.reducer;
