import AjvUtils from '../utils/ajv';
import AjvError from '../errors/AjvError';
import handler from '../handler/Handler';
import NaoExisteAutorError from '../errors/NaoExisteAutorError';
import NaoExisteNoticiaError from '../errors/NaoExisteNoticiaError';
import NaoExistemNoticiasError from '../errors/NaoExistemNoticiasError';
import AutoresService from '../services/AutoresService';
import NoticiasService from '../services/NoticiasService';
import noticiasJson from '../schemas/noticias.json';
import updateNoticias from '../schemas/updateNoticias.json';
import deleteNoticia from '../schemas/deleteNoticia.json';

class NoticiasController {
  async index(req, res) {
    try {
      const { filter } = req.query;

      // eslint-disable-next-line max-len
      const noticias = filter ? await NoticiasService.filterNoticias(filter) : await NoticiasService.getAllNoticias();
      if (!noticias) {
        return handler.onError(res, new NaoExistemNoticiasError());
      }
      return handler.onSuccess(res, noticias);
    } catch (err) {
      console.log({ err });
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

  async store(req, res) {
    try {
      AjvUtils.validate(req.body, noticiasJson);

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

  async update(req, res) {
    try {
      AjvUtils.validate(req.body, updateNoticias);

      const {
        id, titulo, texto, autorId,
      } = req.body;

      const autor = await AutoresService.getAutor(autorId);
      if (!autor) {
        return handler.onError(res, new NaoExisteAutorError());
      }
      await NoticiasService.updateNoticia(id, titulo, texto, autorId);
      return handler.onSuccess(res, { message: 'Noticia editada com sucesso!' });
    } catch (err) {
      console.log({ err });
      if (err.messages) {
        return handler.onError(res, new AjvError(err));
      }
      return handler.onError(res, err);
    }
  }

  async delete(req, res) {
    try {
      AjvUtils.validate(req.body, deleteNoticia);

      const { id } = req.body;
      const noticia = await NoticiasService.getNoticia(id);
      if (!noticia) {
        return handler.onError(res, new NaoExisteNoticiaError());
      }
      const result = await NoticiasService.deleteNoticia(id);
      return handler.onSuccess(res, result);
    } catch (err) {
      console.log({ err });
      if (err.messages) {
        return handler.onError(res, new AjvError(err));
      }
      return handler.onError(res, err);
    }
  }
}

export default new NoticiasController();
