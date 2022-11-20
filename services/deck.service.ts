import { CARDS } from "../data/deck";
import crypto from "crypto";

export interface Card {
  code: string;
  image: string;
  images: {
    png: string;
    svg: string;
  };
  suit: string;
  value: string;
}

export interface Deck {
  deck_id: string;
  cards: Array<Card>;
  remaining: number;
}

const DECKS: Array<Deck> = [];

export class DeckService {
  static shuffleDeck = (deckIndex: number) => {
    for (let i = DECKS[deckIndex].remaining - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      DeckService.swapCard(
        DECKS[deckIndex].cards[i],
        DECKS[deckIndex].cards[j]
      );
    }
  };

  static swapCard = (card_1: Card, card_2: Card) => {
    const temp = card_1;
    card_1 = card_2;
    card_2 = temp;
  };

  static findDeckIndex = (deckID: string) => {
    return DECKS.findIndex((deck: Deck) => deck.deck_id === deckID);
  };

  static shuffleNewDeck = () => {
    const deckID = crypto.randomBytes(16).toString("hex");
    const newDeck: Deck = {
      deck_id: deckID,
      cards: structuredClone(CARDS),
      remaining: 52,
    };
    DECKS.push(newDeck);
    DeckService.shuffleDeck(this.findDeckIndex(deckID));
    return deckID;
  };

  static drawCards = (deckID: string, drawAmount: number) => {
    const deckIndex = DeckService.findDeckIndex(deckID);
    if (DECKS[deckIndex].remaining >= drawAmount) {
      const cards = DECKS[deckIndex].cards.splice(0, drawAmount);
      DECKS[deckIndex].remaining -= drawAmount;
      return {
        cards: cards,
        remaining: DECKS[deckIndex].remaining,
      };
    } else {
      throw {
        deckID: deckID,
        remaining: DECKS[deckIndex].remaining,
        message: `Not enough cards remaining to draw ${drawAmount} additional`,
      }
    }
  };

  static reShuffle = (deckID: string) => {
    const deckIndex = DeckService.findDeckIndex(deckID);
    DECKS[deckIndex].remaining = 52;
    DECKS[deckIndex].cards = structuredClone(CARDS);
    DeckService.shuffleDeck(this.findDeckIndex(deckID));
    return deckID;
  };
}
