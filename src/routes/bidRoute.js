import { Router } from 'express';

import { addNewBid, listAllBids } from '../controllers/bidController';
import { checkAuth } from '../controllers/authController';
import { checkOwnership } from '../controllers/petController';

const router = Router();

router.route('/bid/:petId')
  .post(checkAuth, addNewBid) // Add user's bid on certain pet;
  .get(checkAuth, checkOwnership, listAllBids); // List all bids for certain pet owner

export default router;
