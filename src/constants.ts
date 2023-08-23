import { Chat } from './types';

export const apiURL = 'https://cryptoflexx.fly.dev';

export const LIMIT_MESSAGES = 21; // УСЛОВНОЕ ЗНАЧЕНИЕ

export const COLORS = {
  darkBlue: '#132D46',
  lightGreen: '#48FF9E',
  white: '#fff',
};
export const CHATS: Chat[] = [];

export const extractValues = function (inputString: string) {
  const startIndex = inputString.indexOf("'answer': '") + "'answer': '".length;
  const endIndex = inputString.indexOf("',", startIndex);
  const answer = inputString.substring(startIndex, endIndex);

  const idStartIndex = inputString.indexOf("'id': '") + "'id': '".length;
  const idEndIndex = inputString.indexOf("'", idStartIndex);
  const id = inputString.substring(idStartIndex, idEndIndex);

  return {
    answer: answer,
    id: id,
  };
};
