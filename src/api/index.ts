import { Application, Request, Response } from 'express';
import * as express from 'express';
import routes from './routes';

const api: Application = express();

api.use(express.json());
api.use('/api/v1', routes);


api.get('/', async(_req: Request, res: Response): Promise<Response> => {
  return res.status(200).send({ message: `OK!` })
})

export default api;