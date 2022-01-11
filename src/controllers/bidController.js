import debug from 'debug';

import BidModel from '../repository/bidModel';

const bidLogger = debug('app:bidController');

const addNewBid = (req, res) => {
  const { username, petId, bidValue } = req.body;
  bidLogger(`${username}, ${petId}, ${bidValue}`);
  const newBid = BidModel({ username, petId, value: bidValue });
  newBid.save()
    .then((bid) => {
      bidLogger(`Success bid for pet:"${bid.peId}"`);
      return res.json(bid);
    })
    .catch((err) => {
      bidLogger(`Failed to add bid, Error: ${err.errors}"`);
      res.status(405).json({
        msg: 'Invalid input',
      });
    });
};

const listAllBid = (req, res) => {
  const { petId } = req.body;
  BidModel.find({ petId })
    .then((bid) => {
      bidLogger(`Success retrieval for pet:"${bid.peId}"`);
      return res.json(bid);
    })
    .catch((err) => {
      bidLogger(`Failed to list bids, Error: ${err.errors}"`);
      res.status(405).json({
        msg: 'Invalid input',
      });
    });
};

module.exports = {
  addNewBid, listAllBid,
};
