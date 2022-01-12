import debug from 'debug';

import BidModel from '../repository/bidModel';

const bidLogger = debug('app:bidController');

const badInputsResponse = (res, err) => {
  bidLogger(`Failed due to bad inputs, Error: ${err}"`);
  res.status(405).json({
    msg: 'Invalid input',
  });
};

const addNewBid = (req, res) => {
  const { username, petId, bidValue } = req.body;
  bidLogger(`${username}, ${petId}, ${bidValue}`);
  const newBid = BidModel({ username, petId, value: bidValue });
  newBid.save()
    .then((bid) => {
      bidLogger(`Success bid for pet:"${bid.peId}"`);
      return res.json(bid);
    })
    .catch((err) => badInputsResponse(res, err));
};

const listAllBids = (req, res) => {
  const { petId } = req.params;
  BidModel.find({ petId })
    .then((bids) => {
      bidLogger(`Success retrieval for pet:"${bids[0].peId}"`);
      return res.json(bids);
    })
    .catch((err) => badInputsResponse(res, err));
};

module.exports = {
  addNewBid, listAllBids,
};
