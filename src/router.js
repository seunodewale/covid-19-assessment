import { Router } from 'express';
import EstimatorService from './service';

const router = Router();

router.post('/', EstimatorService.postJson);
router.post('/json', EstimatorService.postJson);
router.post('/xml', EstimatorService.postXml);
router.get('/logs', EstimatorService.getLogs);

export default router;
