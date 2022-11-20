import express from "express";
import { Deck } from "../controllers/deck.controller";

const deck = new Deck();
const router = express.Router();

/**
* @swagger
* components:
*   schemas:
*     newDeck:
*       type: object
*       properties:
*         success : 
*           type: boolean
*           description: Notification of success or failure
*         deck_id : 
*           type: string
*           description: The auto-generated id of the deck
*         shuffled : 
*           type: boolean
*           description: Notification of shuffled
*         remaining : 
*           type: number
*           description: Remaining cards of deck
*       example:
*         success: true
*         deck_id: a26b31a67f874733eacb5a6ef62c94cc
*         shuffled: true
*         remaining: 52
*/

/**
 * @swagger
 * /api/deck/new/shuffle/:
 *   get:
 *     summary: Create a new Deck
 *     responses:
 *       200:
 *         description: Return a new desk id
 */

router.get("/new/shuffle/", deck.shuffleNewDeck);
/**
 * @swagger
 * /api/deck/{deck_id}/draw/?count:
 *   get:
 *     summary: Draw cards
 *     parameters:
 *       - in: path
 *         name: deck_id
 *         schema:
 *           type: string
 *         required: true
 *         description: Deck ID
 *       - in: query
 *         name: count
 *         schema:
 *           type: integer
 *         required: true
 *         description: Number of card drawn
 *     responses:
 *       200:
 *         description: Success
 *
 */
router.get("/:deck_id/draw/", deck.drawCards);
/**
 * @swagger
 * /api/deck/{deck_id}/shuffle/:
 *   get:
 *     summary: Re shuffle deck
 *     parameters:
 *       - in: path
 *         name: deck_id
 *         schema:
 *           type: string
 *         required: true
 *         description: Deck ID
 *     responses:
 *       200:
 *         description: Success
 *
 */
router.get("/:deck_id/shuffle/", deck.reShuffle);
export default router;
