import debug from 'debug';
import PetModel from '../repository/petModel';

const petLogger = debug('app:pet');

const checkOwnership = (req, res, next) => {
  const { petId } = req.params;
  const { _id } = req.user;
  petLogger(petId, _id);
  PetModel.findOne({ _id: petId, owner: _id })
    .then((pet) => {
      if (!pet) throw new Error('not an owner');
      next();
    })
    .catch((err) => {
      petLogger(`Unauthorized Request, ${err}`);
      res.status(401).json({
        msg: 'Unauthorized request, not an owner',
      });
    });
};

module.exports = { checkOwnership };
