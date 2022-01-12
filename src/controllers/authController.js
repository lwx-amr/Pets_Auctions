import debug from 'debug';
import UserModel from '../repository/userModel';

const authLogger = debug('app:auth');

const unauthorizedResponse = (res) => {
  res.status(401).json({
    msg: 'Unauthorized request',
  });
};

const checkAuth = (req, res, next) => {
  const apiKey = req.headers.api_key;
  if (!apiKey) unauthorizedResponse(res);
  UserModel.findOne({ apiKey })
    .then((user) => {
      req.user = user;
      next();
    })
    .catch((err) => {
      authLogger(`Unauthorized Request, Error: ${err}`);
      unauthorizedResponse(res);
    });
};

module.exports = { checkAuth };
