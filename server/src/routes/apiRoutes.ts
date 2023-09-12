import express from 'express';
import { addCart, getCart } from '../controllers/cartController';

const apiRouter = express.Router();

apiRouter.get('/api', getCart);
apiRouter.post('/api', addCart);

export default apiRouter;