import { Card } from '../types';
import { getMnemonicaDeck, getSortedDeck } from '../constants';

export const shuffleDeck = (deck: Card[]): Card[] => {
  const newDeck = [...deck];
  for (let i = newDeck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newDeck[i], newDeck[j]] = [newDeck[j], newDeck[i]];
  }
  return newDeck;
};

export const generateDeck = (type: 'mnemonica' | 'random'): Card[] => {
  if (type === 'mnemonica') {
    return getMnemonicaDeck();
  } else {
    // Generate a standard sorted deck then shuffle it
    return shuffleDeck(getSortedDeck());
  }
};
