import debug from 'debug';

import BidModel from '../repository/bidModel';

/* import petModel from '../repository/petModel';
import userModel from '../repository/userModel';

const newUsers = [
  {
    name: 'Amr',
    email: 'amr@gmail.com',
    password: '2a1sa%3a@asd%f$g#7qw7eas6d54asd564asd44asd',
    apiKey: 'secret_api_key_of_amr',
  },
  {
    name: 'Sara',
    email: 'sara@gmail.com',
    password: '4a1sa%3a@asd%f$g#7qw7eas6d54asd564asd44asd',
    apiKey: 'secret_api_key_of_sara',
  },
  {
    name: 'Mary',
    email: 'mary@gmail.com',
    password: '6a1sa%3a@asd%f$g#7qw7eas6d54asd564asd44asd',
    apiKey: 'secret_api_key_of_mary',
  },
  {
    name: 'Sam',
    email: 'Sam@gmail.com',
    password: '8a1sa%3a@asd%f$g#7qw7eas6d54asd564asd44asd',
    apiKey: 'secret_api_key_of_sam',
  },
];
/* newUsers.forEach(async (element) => {
  const newUser = userModel(element);
  await newUser.save();
}); */

/* const newPets = [
  {
    name: 'Puppy',
    owner: '61df1696c836e66c818d962b',
  },
  {
    name: 'Little Cat',
    owner: '61df1696c836e66c818d962b',
  },
  {
    name: 'Big Dog',
    owner: '61df1696c836e66c818d962c',
    status: 'pending',
  },
  {
    name: 'Small Dog',
    owner: '61df1696c836e66c818d962e',
    status: 'sold',
  },
];
newPets.forEach(async (element) => {
  const newPet = petModel(element);
  await newPet.save();
}); */

const bidLogger = debug('app:bidController');

const badInputsResponse = (res, err) => {
  bidLogger(`Failed due to bad inputs, ${err}"`);
  res.status(405).json({
    msg: 'Invalid input',
  });
};

const addNewBid = (req, res) => {
  const { petId } = req.params;
  const { bidValue } = req.body;
  const { _id, name } = req.user;
  const newBid = BidModel({
    petId, userId: _id, name, value: bidValue,
  });
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
      bidLogger(`Success retrieval for pet:"${bids[0].petId}"`);
      return res.json(bids);
    })
    .catch((err) => badInputsResponse(res, err));
};

module.exports = {
  addNewBid, listAllBids,
};
