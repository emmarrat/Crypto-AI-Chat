import { combineReducers, configureStore } from '@reduxjs/toolkit';

import { persistStore } from 'redux-persist';
import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
} from 'redux-persist/es/constants';
import { chatsReducer } from '../features/Chat/chatsSlice';

// const usersPersistConfig = {
//   key: 'crypto-chat:users',
//   storage,
//   whitelist: ['chatsHistory', 'selectedChat'],
// };

const rootReducer = combineReducers({
  chats: chatsReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
