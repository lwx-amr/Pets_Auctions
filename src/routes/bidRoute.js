/* eslint-disable import/named */
import { Router } from 'express';

import { addNewBid, listAllBids } from '../controllers/bidController';
import { checkAuth } from '../controllers/authController';

const router = Router();

// Add user's bid on certain pet;
router.route('/bid')
  .post(addNewBid);

// List All pet bids for owner
router.route('/bid/:petId')
  .get(checkAuth, listAllBids);

export default router;
