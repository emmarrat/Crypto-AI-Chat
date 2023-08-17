import { createAsyncThunk } from '@reduxjs/toolkit';
import { RequestBody } from '../../types';
import axiosApi from '../../axiosApi';

export const sendMessage = createAsyncThunk<string, RequestBody>(
  'chat/fetchData', // Action type prefix
  async (body, thunkAPI) => {
    try {
      const response = await axiosApi.post('/chat', body);
      console.log(response.data);
      return response.data;
    } catch (error) {
      // You can handle errors here
      throw error;
    }
  },
);
