import { createAsyncThunk } from '@reduxjs/toolkit';
import { ChatRequestBody, ChatResponse } from '../../types';
import axiosApi from '../../axiosApi';

export const sendMessage = createAsyncThunk<ChatResponse, ChatRequestBody>(
  'chat/fetchData',
  async (body) => {
    try {
      const { data } = await axiosApi.post('/chat', body);
      return data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
);
