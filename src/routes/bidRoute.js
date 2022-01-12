/* eslint-disable import/named */
import { Router } from 'express';

import { addNewBid, listAllBids } from '../controllers/bidController';
import { checkAuth } from '../controllers/authController';
import { checkOwnership } from '../controllers/petController';

const router = Router();

// Add user's bid on certain pet;
router.route('/bid')
  .post(checkAuth, addNewBid);

// List All pet bids for owner
router.route('/bid/:petId')
  .get(checkAuth, checkOwnership, listAllBids);

export default router;
