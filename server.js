import http from 'http';
import express from 'express';
import logger from 'morgan';
import bodyParser from 'body-parser';
import routes from './server/routes/index';

// Set up express app
const app = express();
const router = express.Router();

// Port configuration
const port = parseInt(process.env.PORT, 10) || 8000;
app.set('port', port);

routes(router);

// Log requests to the console
app.use(logger('dev'));

// Parse incoming request data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// API Routes
app.use('/api/v1', router);

// Set up all default catch-all route that sends a message in JSON format
app.get('*', (req, res) => res.status(404).send({
  message: 'That route does not exist'
}));

// Create server
const server = http.createServer(app);

server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

export default app;
