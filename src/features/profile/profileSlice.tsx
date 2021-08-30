import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from '../../app/store';

export interface UsersState {
    user: Array<any>;
    status: 'idle' | 'loading' | 'failed';
}

const initialState: UsersState = {
  user: [],
  status: 'idle',
};

export const fetchUser = createAsyncThunk('', async () => await axios.get('https://randomuser.me/api'));

export const ProfileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    updateUser: (state, action) => {
      state.user = [action.payload];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.status = 'idle';
        // @ts-ignore
        state.user = action?.payload.data.results.map(value => ({
          id: value.id,
          gender: value.gender,
          avatar: value.picture.medium,
          firstName: value.name.first,
          lastName: value.name.last,
          city: value.location.city,
          address: value.location.street.name + ', ' + value.location.street.number,
          emails: [value.email],
          phones: [value.phone],
          postcode: value.location.postcode,
        }));
      });
  },
});

export const { updateUser } = ProfileSlice.actions;

export const selectProfileData = (state: RootState) => state.profile.user[0];

export default ProfileSlice.reducer;
