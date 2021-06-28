import { Router } from 'express';

const routes = new Router();

routes.get('/', (req, res) => {
  res.json('Servidor rodando');
});

export default routes;
