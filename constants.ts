import { Card, Suit, Rank } from './types';

// Helper to create card objects
const createCard = (rank: Rank, suit: Suit): Card => {
  const color = (suit === 'hearts' || suit === 'diamonds') ? 'red' : 'black';
  const suitSymbol = {
    hearts: '♥',
    diamonds: '♦',
    clubs: '♣',
    spades: '♠'
  }[suit];
  
  return {
    id: `${rank}-${suit}`,
    rank,
    suit,
    color,
    fullName: `${rank} of ${suit.charAt(0).toUpperCase() + suit.slice(1)}`
  };
};

// The Tamariz Mnemonica Stack Order
// 4C, 2H, 7D, 3C, 4H, 6D, AS, 5H, 9S, 2S, QH, 3D, QC, 8H, 6S, 5S, 9H, KC, 2D, JH, 
// 3S, 8S, 6H, 10C, 5D, KD, 2C, 3H, 8D, 5C, KS, JD, 8C, 10S, KH, JC, 7S, 10H, AD, 
// 4S, 7H, 4D, AC, 9C, JS, QD, 7C, QS, 10D, 6C, AH, 9D
export const MNEMONICA_ORDER: { r: Rank, s: Suit }[] = [
  { r: '4', s: 'clubs' }, { r: '2', s: 'hearts' }, { r: '7', s: 'diamonds' }, { r: '3', s: 'clubs' },
  { r: '4', s: 'hearts' }, { r: '6', s: 'diamonds' }, { r: 'A', s: 'spades' }, { r: '5', s: 'hearts' },
  { r: '9', s: 'spades' }, { r: '2', s: 'spades' }, { r: 'Q', s: 'hearts' }, { r: '3', s: 'diamonds' },
  { r: 'Q', s: 'clubs' }, { r: '8', s: 'hearts' }, { r: '6', s: 'spades' }, { r: '5', s: 'spades' },
  { r: '9', s: 'hearts' }, { r: 'K', s: 'clubs' }, { r: '2', s: 'diamonds' }, { r: 'J', s: 'hearts' },
  { r: '3', s: 'spades' }, { r: '8', s: 'spades' }, { r: '6', s: 'hearts' }, { r: '10', s: 'clubs' },
  { r: '5', s: 'diamonds' }, { r: 'K', s: 'diamonds' }, { r: '2', s: 'clubs' }, { r: '3', s: 'hearts' },
  { r: '8', s: 'diamonds' }, { r: '5', s: 'clubs' }, { r: 'K', s: 'spades' }, { r: 'J', s: 'diamonds' },
  { r: '8', s: 'clubs' }, { r: '10', s: 'spades' }, { r: 'K', s: 'hearts' }, { r: 'J', s: 'clubs' },
  { r: '7', s: 'spades' }, { r: '10', s: 'hearts' }, { r: 'A', s: 'diamonds' }, { r: '4', s: 'spades' },
  { r: '7', s: 'hearts' }, { r: '4', s: 'diamonds' }, { r: 'A', s: 'clubs' }, { r: '9', s: 'clubs' },
  { r: 'J', s: 'spades' }, { r: 'Q', s: 'diamonds' }, { r: '7', s: 'clubs' }, { r: 'Q', s: 'spades' },
  { r: '10', s: 'diamonds' }, { r: '6', s: 'clubs' }, { r: 'A', s: 'hearts' }, { r: '9', s: 'diamonds' },
];

export const getMnemonicaDeck = (): Card[] => {
  return MNEMONICA_ORDER.map(c => createCard(c.r, c.s));
};

export const getSortedDeck = (): Card[] => {
  const suits: Suit[] = ['spades', 'hearts', 'clubs', 'diamonds'];
  const ranks: Rank[] = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
  const deck: Card[] = [];
  suits.forEach(s => ranks.forEach(r => deck.push(createCard(r, s))));
  return deck;
};
