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
    text: 'Какие последние новости на рынке криптовалют?',
  },
  {
    id: '2',
    role: 'assistant',
    text: 'Недавно произошли значительные колебания цен на криптовалюты.',
  },
  {
    id: '3',
    role: 'user',
    text: 'Какая криптовалюта в настоящее время показывает лучшие результаты?',
  },
  {
    id: '4',
    role: 'assistant',
    text: 'Биткойн (BTC) лидирует на рынке как по цене, так и по капитализации.',
  },
  {
    id: '5',
    role: 'user',
    text: 'Есть ли предстоящие регуляторные изменения, затрагивающие криптовалюты?',
  },
  {
    id: '6',
    role: 'assistant',
    text: 'Несколько стран рассматривают или уже внедрили регулятивные меры в связи с растущей популярностью криптовалют.',
  },
  {
    id: '7',
    role: 'user',
    text: 'Какие риски связаны с инвестициями в криптовалюты?',
  },
  {
    id: '8',
    role: 'assistant',
    text: 'Инвестиции в криптовалюты несут риски, такие как волатильность, уязвимости безопасности и правовая неопределенность.',
  },
  {
    id: '9',
    role: 'user',
    text: 'Можете ли вы порекомендовать надежную криптовалютную биржу?',
  },
  {
    id: '10',
    role: 'assistant',
    text: 'Binance и Coinbase являются популярными и надежными криптовалютными биржами.',
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
