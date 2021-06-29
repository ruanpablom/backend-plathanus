import AjvUtils from '../utils/ajv';
import AjvError from '../errors/AjvError';
import handler from '../handler/Handler';
import NaoExisteAutorError from '../errors/NaoExisteAutorError';
import NaoExisteNoticiaError from '../errors/NaoExisteNoticiaError';
import NaoExistemNoticiasError from '../errors/NaoExistemNoticiasError';
import AutoresService from '../services/AutoresService';
import NoticiasService from '../services/NoticiasService';

const schema = '../schemas';

class NoticiasController {
  async index(req, res) {
    try {
      const noticias = await NoticiasService.getAllNoticias();
      if (!noticias) {
        return handler.onError(res, new NaoExistemNoticiasError());
      }
      return handler.onSuccess(res, noticias);
    } catch (err) {
      console.log({ err });
      return handler.onError(res, err);
    }
  }

  async store(req, res) {
    try {
      AjvUtils.validate(req.body, schema, 'noticias');

      const { titulo, texto, autorId } = req.body;

      const autor = await AutoresService.getAutor(autorId);
      if (!autor) {
        return handler.onError(res, new NaoExisteAutorError());
      }
      await NoticiasService.inserirNoticia(titulo, texto, autorId);
      return handler.onSuccess(res, { message: 'Notícia inserida com sucesso!' });
    } catch (err) {
      console.log({ err });
      if (err.messages) {
        return handler.onError(res, new AjvError(err));
      }
      return handler.onError(res, err);
    }
  }

  async show(req, res) {
    try {
      const { id } = req.params;
      const noticia = await NoticiasService.getNoticia(id);
      if (!noticia) {
        return handler.onError(res, new NaoExisteNoticiaError());
      }
      return handler.onSuccess(res, noticia);
    } catch (err) {
      console.log({ err });
      return handler.onError(res, err);
    }
  }
}

export default new NoticiasController();
