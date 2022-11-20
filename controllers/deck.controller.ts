import { Request, Response } from 'express';
import {DeckService} from '../services/deck.service'

const NUMBER_OF_CARD_IN_NEW_DECK = 52

export class Deck {
  public shuffleNewDeck = (req: Request, res: Response) => {
    try {
      const deckID = DeckService.shuffleNewDeck();
      return res.status(200).json({
        success: true,
        deck_id: deckID,
        shuffled: true,
        remaining: NUMBER_OF_CARD_IN_NEW_DECK
      });
    } catch (error) {
      return res.status(200).json({
        success: false,
        error,
      });
    }
  };

  public drawCards = (req: Request, res: Response) => {
    try {
      const deckID = req.params.deck_id;
      const drawAmount : number = Number(req.query.count);
      const drawnCards = DeckService.drawCards(deckID, drawAmount)
      return res.status(200).json({
        success: true,
        deck_id: deckID,
        cards: drawnCards.cards,
        remaining: drawnCards.remaining
      });
    } catch (error :any) {
      return res.status(200).json({
        success: false,
        deck_id: error.deckID,
        cards: [],
        remaining: error.remaining,
        error: error.message
      });
    }
  };

  public reShuffle = (req: Request, res: Response) => {
    try {
      const deckID = req.params.deck_id;
      DeckService.reShuffle(deckID)
      return res.status(200).json({
        success: true,
        deck_id: deckID,
        shuffled: true,
        remaining: NUMBER_OF_CARD_IN_NEW_DECK
      });
    } catch (error) {
      return res.status(200).json({
        success: false,
        error,
      });
    }
  };

}