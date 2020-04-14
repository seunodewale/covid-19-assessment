import fs from 'fs';
import path from 'path';
import { toXML } from 'jstoxml';

import covid19ImpactEstimator from './estimator';
import Util from './utils';

const util = new Util();

class EstimatorService {
  static async postJson(req, res) {
    if (!req.body.region || !req.body.periodType) {
      util.setError(400, 'Please provide complete details');
      return util.send(res);
    }
    try {
      const covidEstimates = await covid19ImpactEstimator(req.body);
      util.setSuccess(201, covidEstimates);
      return util.send(res);
    } catch (error) {
      util.setError(400, error.message);
      return util.send(res);
    }
  }

  static async postXml(req, res) {
    if (!req.body.region || !req.body.periodType) {
      util.setError(400, 'Please provide complete details');
      return util.send(res);
    }
    try {
      const covidEstimates = await covid19ImpactEstimator(req.body);
      util.setSuccess(201, covidEstimates);
      res.set('Content-Type', 'application/xml');
      return res.send(toXML(covidEstimates));
    } catch (error) {
      util.setError(400, error.message);
      return util.send(res);
    }
  }

  static getLogs(req, res) {
    try {
      const logs = fs.readFileSync(path.join(__dirname, '../logs/log.txt'), 'utf8');
      res.set('Content-Type', 'text/plain');
      return res.send(logs);
    } catch (error) {
      util.setError(400, error.message);
      return util.send(res);
    }
  }
}

export default EstimatorService;
