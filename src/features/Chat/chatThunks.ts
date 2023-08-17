import { createAsyncThunk } from '@reduxjs/toolkit';
import { RequestBody } from '../../types';
import axiosApi from '../../axiosApi';

export const sendMessage = createAsyncThunk<string, RequestBody>(
  'chat/fetchData',
  async (body) => {
    try {
      const response = await axiosApi.post('/chat', body);
      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
);
