import fs from 'fs';
import path from 'path';

import express from 'express';
import bodyParser from 'body-parser';
import logger from 'morgan';

import router from './router';

const app = express();

const port = process.env.PORT || 8000;

const accessLogStream = fs.createWriteStream(path.join(__dirname, '../logs/access.txt'));

app.use(logger(':method\t\t :url\t\t :status\t\t :response-time ms', { stream: accessLogStream }));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/api/v1/on-covid-19', router);

// when a random route is inputed
app.get('*', (req, res) => res.status(200).send({
  message: 'Welcome to this API.'
}));

app.listen(port, () => {
  console.log(`Server is running on PORT ${port}`);
});

export default app;
