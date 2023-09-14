import axiosApi from '../../axiosApi';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { isAxiosError } from 'axios';
import { AuthMutation, GlobalError, UserAuthResponse } from '../../types';

export const register = createAsyncThunk<
  UserAuthResponse,
  AuthMutation,
  { rejectValue: GlobalError }
>('users/register', async (register, { rejectWithValue }) => {
  try {
    const { data } = await axiosApi.post('/register', register);
    return data;
  } catch (e) {
    if (isAxiosError(e) && e.response && e.response.status === 400) {
      return rejectWithValue(e.response.data as GlobalError);
    }
    throw e;
  }
});

export const login = createAsyncThunk<
  UserAuthResponse,
  AuthMutation,
  { rejectValue: GlobalError }
>('users/login', async (register, { rejectWithValue }) => {
  try {
    const { data } = await axiosApi.post('/login', register);
    return data;
  } catch (e) {
    if (isAxiosError(e) && e.response && e.response.status === 400) {
      return rejectWithValue(e.response.data as GlobalError);
    }
    throw e;
  }
});
