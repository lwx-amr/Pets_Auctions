import debug from 'debug';

import BidModel from '../repository/bidModel';

const bidLogger = debug('app:bidController');

const badInputsResponse = (res, err) => {
  bidLogger(`Failed due to bad inputs, ${err}"`);
  res.status(405).json({
    msg: 'Invalid input',
  });
};

const addNewBid = (req, res) => {
  const newBid = BidModel({
    petId: req.params.petId,
    value: req.body.value,
    userId: req.user._id,
    name: req.user.name,
  });
  newBid.save()
    .then((bid) => {
      bidLogger(`Success bid for pet:"${bid.petId}"`);
      return res.json(bid);
    })
    .catch((err) => badInputsResponse(res, err));
};

const listAllBids = (req, res) => {
  const { petId } = req.params;
  BidModel.find({ petId })
    .then((bids) => {
      bidLogger(`Success retrieval for pet:"${bids[0].petId}"`);
      return res.json(bids);
    });
};

module.exports = {
  addNewBid, listAllBids,
};
