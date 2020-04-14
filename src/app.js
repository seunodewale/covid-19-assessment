import fs from 'fs';
import path from 'path';

import express from 'express';
import bodyParser from 'body-parser';
import logger from 'morgan';

import router from './router';

const app = express();

const port = process.env.PORT || 8000;
const custom = (tokens, req, res) => {
  const output = [
    tokens.method(req, res),
    tokens.url(req, res),
    tokens.status(req, res),
    parseInt(tokens['response-time'](req, res), 10) < 10
      ? `0${parseInt(tokens['response-time'](req, res), 10)}ms`
      : `${parseInt(tokens['response-time'](req, res), 10)}ms`
  ].join('\t\t');
  return output;
};

const accessLogStream = fs.createWriteStream(path.join(__dirname, '../logs/log.txt'));

app.use(logger(custom, { stream: accessLogStream }));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/api/v1/on-covid-19', router);

// when a random route is inputed
app.get('*', (req, res) => res.status(200).send({
  message: 'Welcome to this API.'
}));

app.listen(port);

export default app;
