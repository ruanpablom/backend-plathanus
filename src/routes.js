import { Router } from 'express';

import AutoresController from './controllers/AutoresController';
import NoticiasController from './controllers/NoticiasController';

const routes = new Router();

routes.get('/', (req, res) => {
  res.json('Servidor rodando');
});

routes.post('/autores', AutoresController.store);
routes.get('/autores', AutoresController.index);

routes.get('/noticias', NoticiasController.index);
routes.get('/noticias/:id', NoticiasController.show);
routes.post('/noticias', NoticiasController.store);
routes.put('/noticias', NoticiasController.update);
routes.delete('/noticias', NoticiasController.delete);

export default routes;
