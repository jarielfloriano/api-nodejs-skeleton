import express from 'express';
import 'dotenv/config';
import cors from 'cors';
import bodyParser from 'body-parser';
import route from './src/routes';
import errorHandler from './src/helpers/error/error-handler';
import 'express-async-errors';
import logger from './src/helpers/log/logger';

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

route(app);

app.use(errorHandler);

const port = process.env.NODE_PORT || 5000;
app.listen(port, () => {
  logger.log({
    level: 'info',
    message: `API running on port ${port} - ${new Date()}`,
  });
});
