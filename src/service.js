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
    //   return util.sendXML(res);
    } catch (error) {
      util.setError(400, error.message);
      return util.send(res);
    }
  }
}

export default EstimatorService;
