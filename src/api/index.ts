import express, { Application, Request, Response } from 'express';

const api: Application = express();

api.use(express.json());

api.get('/', async(req: Request, res: Response): Promise<Response> => {
  return res.status(200).send({ message: `test` })
})

export default api;