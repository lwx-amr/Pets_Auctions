import debug from 'debug';
import PetModel from '../repository/petModel';

const petLogger = debug('app:pet');

const checkOwnership = (req, res, next) => {
  const { petId } = req.params;
  const { userId } = req;
  PetModel.findOne({ _id: petId, owner: userId })
    .then(() => next())
    .catch((err) => {
      petLogger(`Unauthorized Request, Error: ${err}`);
      res.status(401).json({
        msg: 'Unauthorized request',
      });
    });
};

module.exports = { checkOwnership };
