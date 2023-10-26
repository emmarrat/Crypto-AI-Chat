import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  AllChatsResponse,
  BodyWithId,
  ChatFull,
  ChatFullData,
  ChatRequestBody,
  ChatResponse,
  ConversationId,
  GlobalError,
  MessageFull,
} from '../../types';
import axiosApi from '../../axiosApi';
import generateId from '../../generateId';

// export const sendMessage = createAsyncThunk<ChatResponse, ChatRequestBody>(
//   'chat/sendMessage',
//   async (body) => {
//     try {
//       const { data } = await axiosApi.post('/chat', body);
//       return data;
//     } catch (error) {
//       console.log(error);
//       throw error;
//     }
//   },
// );

export const sendMessage = createAsyncThunk<ChatResponse, ChatRequestBody>(
  'chat/sendMessage',
  async (body) => {
    try {
      const { data } = await axiosApi.post('/ask', body);
      return data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
);

export const getChatById = createAsyncThunk<ChatFull, ConversationId>(
  'chat/getChatById',
  async (body) => {
    try {
      const { data } = await axiosApi.post<ChatFullData>('/get_conversation', body);
      const newConversations: MessageFull[] = data.conversation.map((chat) => {
        return {
          ...chat,
          id: generateId(),
        };
      });

      const result: ChatFull = {
        ...data,
        conversation: newConversations,
      };
      return result;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
);

export const getAllChats = createAsyncThunk<AllChatsResponse | GlobalError, BodyWithId>(
  'chat/getAllChats',
  async (body) => {
    try {
      const { data } = await axiosApi.post('/get_conversations_id', body);
      return data as AllChatsResponse;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
);
