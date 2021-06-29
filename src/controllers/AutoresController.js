import AjvUtils from '../utils/ajv';
import AjvError from '../errors/AjvError';
import NaoExistemAutoresError from '../errors/NaoExistemAutoresError';
import handler from '../handler/Handler';
import AutoresService from '../services/AutoresService';
import autorJson from '../schemas/autor.json';

class AutoresController {
  async store(req, res) {
    try {
      AjvUtils.validate(req.body, autorJson);

      const { nome } = req.body;
      const autor = await AutoresService.inserirAutor(nome);
      return handler.onSuccess(res, autor);
    } catch (err) {
      console.log({ err });
      if (err.messages) {
        return handler.onError(res, new AjvError(err));
      }
      return handler.onError(res, err);
    }
  }

  async index(req, res) {
    try {
      const autores = await AutoresService.todosAutores();
      if (autores.length === 0) {
        return handler.onError(res, new NaoExistemAutoresError());
      }
      return handler.onSuccess(res, autores);
    } catch (err) {
      console.log({ err });
      return handler.onError(res, err);
    }
  }
}

export default new AutoresController();
