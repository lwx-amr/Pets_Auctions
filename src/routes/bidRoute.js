import { Router } from 'express';

// eslint-disable-next-line import/named
import { addNewBid, listAllBids } from '../controllers/bidController';

const router = Router();

// Add user's bid on certain pet;
router.route('/bid')
  .post(addNewBid);

// List All pet bids for owner
router.route('/bid/:petId')
  .get(listAllBids);

export default router;
