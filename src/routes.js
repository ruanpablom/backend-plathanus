import { Router } from 'express';

import AutoresController from './controllers/AutoresController';

const routes = new Router();

routes.get('/', (req, res) => {
  res.json('Servidor rodando');
});

routes.post('/autores', AutoresController.store);
routes.get('/autores', AutoresController.index);

export default routes;
