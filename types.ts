export type Suit = 'hearts' | 'diamonds' | 'clubs' | 'spades';
export type Rank = 'A' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10' | 'J' | 'Q' | 'K';

export interface Card {
  id: string;
  suit: Suit;
  rank: Rank;
  color: 'red' | 'black';
  fullName: string;
}

export type DeckType = 'mnemonica' | 'random';
export type PracticeMode = 'manual' | 'timer';

export interface AppState {
  deck: Card[];
  deckType: DeckType;
  currentIndex: number;
  isFlipped: boolean; // true = showing back, false = showing face
  isPlaying: boolean; // for timer mode
  practiceMode: PracticeMode;
  speedSeconds: number;
  sessionStartTime: number | null;
}