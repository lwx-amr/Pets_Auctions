// Requiring Modules
import express from 'express';
import config from 'config';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import debug from 'debug';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';

// Requiring project files
import bidRoute from './routes/bidRoute';

// load configurations
const port = config.get('app.port');
const db = config.get('database.url');
const app = express();

// Init loggers
const httpLogger = debug('app:http-server');
const dbLogger = debug('app:db');

// Enable body-parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());

// Using helmet to increase security
app.use(helmet());

// Using Limiter to prevent attacks
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 min is the time of our cycle
  max: 100, // Max number of requests
  delayMs: 0, // Disable delay between each request
  // Each ip will be able to make only 100 request in each 15 min with no delay between requests
});
app.use(apiLimiter); // apply to all requests

// Setup mongoose connection
mongoose.Promise = global.Promise;
mongoose.connect(db)
  .catch((err) => dbLogger({ error: err }));

// Calling api routes
app.use(bidRoute);

// Running server
app.listen(port, () => httpLogger(`Server is running on port ${port}`));

// For testing import
export default app;
