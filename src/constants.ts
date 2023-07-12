import { Chat, HistoryChats } from './types';

export const apiURL = 'HERE GONNA BE SOME REAL URL';

export const COLORS = {
  darkBlue: '#132D46',
  lightGreen: '#48FF9E',
  white: '#fff',
};

export const MOCK_DATA = [
  {
    id: '1',
    role: 'user',
    text: 'What is the latest news in the crypto market?',
  },
  {
    id: '2',
    role: 'assistant',
    text: 'There have been significant price fluctuations in cryptocurrencies recently.',
  },
  {
    id: '3',
    role: 'user',
    text: 'Which cryptocurrency is currently performing the best?',
  },
  {
    id: '4',
    role: 'assistant',
    text: 'Bitcoin (BTC) has been leading the market in terms of both price and market capitalization.',
  },
  {
    id: '5',
    role: 'user',
    text: 'Are there any upcoming regulatory changes affecting cryptocurrencies?',
  },
  {
    id: '6',
    role: 'assistant',
    text: 'Several countries are considering or implementing regulations to address the growing popularity of cryptocurrencies.',
  },
  {
    id: '7',
    role: 'user',
    text: 'What are the risks associated with investing in cryptocurrencies?',
  },
  {
    id: '8',
    role: 'assistant',
    text: 'Cryptocurrency investments carry risks such as volatility, security vulnerabilities, and regulatory uncertainties.',
  },
  {
    id: '9',
    role: 'user',
    text: 'Can you recommend a reliable cryptocurrency exchange?',
  },
  {
    id: '10',
    role: 'assistant',
    text: 'Binance and Coinbase are popular and trusted cryptocurrency exchanges.',
  },
];

export const MOCK_DATA_FIFTEEN = [
  {
    id: '1',
    role: 'user',
    text: 'What are some popular altcoins apart from Bitcoin?',
  },
  {
    id: '2',
    role: 'assistant',
    text: 'Ethereum, Ripple, Litecoin, and Cardano are some popular altcoins in the market.',
  },
  {
    id: '3',
    role: 'user',
    text: 'How can I securely store my cryptocurrencies?',
  },
  {
    id: '4',
    role: 'assistant',
    text: 'Hardware wallets such as Ledger and Trezor provide secure storage for cryptocurrencies.',
  },
  {
    id: '5',
    role: 'user',
    text: 'What is the concept of decentralization in cryptocurrencies?',
  },
  {
    id: '6',
    role: 'assistant',
    text: 'Decentralization refers to the absence of a central authority controlling the cryptocurrency network.',
  },
  {
    id: '7',
    role: 'user',
    text: 'Which cryptocurrencies have the potential for high returns?',
  },
  {
    id: '8',
    role: 'assistant',
    text: 'Investors often consider cryptocurrencies like Ethereum, Binance Coin, and Cardano for potential high returns.',
  },
  {
    id: '9',
    role: 'user',
    text: 'What are the tax implications of cryptocurrency investments?',
  },
  {
    id: '10',
    role: 'assistant',
    text: 'Cryptocurrency investments may have tax obligations depending on your jurisdiction. Consult a tax professional for guidance.',
  },
  {
    id: '11',
    role: 'user',
    text: 'Is it possible to mine cryptocurrencies using a regular computer?',
  },
  {
    id: '12',
    role: 'assistant',
    text: 'Bitcoin mining requires specialized hardware, but some cryptocurrencies can be mined using regular computers.',
  },
  {
    id: '13',
    role: 'user',
    text: 'How can I protect my cryptocurrency wallet from hacking attempts?',
  },
  {
    id: '14',
    role: 'assistant',
    text: 'Use strong passwords, enable two-factor authentication, and keep your wallet software up to date to enhance security.',
  },
  {
    id: '15',
    role: 'user',
    text: 'What is the future outlook for cryptocurrencies?',
  },
];

export const MOCK_DATA_FIVE = [
  {
    id: '1',
    role: 'user',
    text: 'What is the current price of Bitcoin?',
  },
  {
    id: '2',
    role: 'assistant',
    text: 'The current price of Bitcoin is $40,000.',
  },
  {
    id: '3',
    role: 'user',
    text: 'How does blockchain technology work?',
  },
  {
    id: '4',
    role: 'assistant',
    text: 'Blockchain technology uses a decentralized and distributed ledger to record and verify transactions.',
  },
  {
    id: '5',
    role: 'user',
    text: 'Can you recommend any resources to learn more about cryptocurrency trading?',
  },
];

export const HISTORY_CHATS: HistoryChats[] = [
  {
    id: '1',
    title: 'Which crypto coin i should buy?',
    chatId: '1',
  },
  {
    id: '2',
    title: 'Crypto news for last week',
    chatId: '2',
  },
  {
    id: '3',
    title: 'Doggy coin is still relevant?',
    chatId: '3',
  },
];

export const CHATS: Chat[] = [
  { id: '1', chat: MOCK_DATA },
  { id: '2', chat: MOCK_DATA_FIFTEEN },
  { id: '3', chat: MOCK_DATA_FIVE },
];
