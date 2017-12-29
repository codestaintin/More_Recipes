import http from 'http';
import express from 'express';
import logger from 'morgan';
import bodyParser from 'body-parser';
import routes from './server/routes/routes';

// Set up express app
const server = express();
const router = express.Router();

// Port configuration
const port = parseInt(process.env.PORT, 10) || 8000;

routes(router);

// Log requests to the console
server.use(logger('dev'));

// Parse incoming request data
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: false }));

// API Routes
server.use('/api/v1', router);

// Set up all default catch-all route that sends a message in JSON format
server.get('*', (req, res) => res.status(404).send({
  message: 'That route does not exist'
}));

// Create server
const app = http.createServer(server);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

export default server;