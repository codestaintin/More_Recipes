import http from 'http';
import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import compression from 'compression';
import path from 'path';
import winston from 'winston';
import morganLogger from 'morgan';
import routes from '../server/routes/routes';

dotenv.config();

const port = parseInt(process.env.PORT, 10) || 8000;

// Set up express app
const server = express();
const router = express.Router();
// Create winston logger
const logger = new (winston.Logger)({
  transports: [
    new (winston.transports.Console)({ colorize: true })
  ]
});

routes(router);

// Log requests to the console
server.use(morganLogger('dev'));

// Parse incoming request data
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));
server.use(compression());
server.use(express.static('production'));

// API Routes
server.use('/api/v1', router);

server.get('/api/v1/*', (req, res) => res.status(404).send({
  message: 'That route does not exist',
}));

server.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../production/index.html'));
});

// Create server
const app = http.createServer(server);

app.listen(port, (err) => {
  if (err) {
    return logger.error(err);
  }
  logger.info('app running on port', port);
});

export default server;