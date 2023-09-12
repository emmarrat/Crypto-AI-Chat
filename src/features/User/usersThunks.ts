import axiosApi from '../../axiosApi';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { isAxiosError } from 'axios';
import { AuthMutation, UserAuthResponse } from '../../types';

export const register = createAsyncThunk<UserAuthResponse, AuthMutation>(
  'users/register',
  async (register: AuthMutation) => {
    try {
      const { data } = await axiosApi.post('/register', register);
      return data;
    } catch (e) {
      if (isAxiosError(e)) {
        return e;
      }
      throw e;
    }
  },
);

export const login = createAsyncThunk<UserAuthResponse, AuthMutation>(
  'users/login',
  async (register: AuthMutation) => {
    try {
      const { data } = await axiosApi.post('/login', register);
      return data;
    } catch (e) {
      if (isAxiosError(e)) {
        return e;
      }
      throw e;
    }
  },
);
