import NoticiasRepository from '../repositories/NoticiasRepository';

class NoticiasService {
  async inserirNoticia(titulo, texto, autorId) {
    try {
      await NoticiasRepository.inserirNoticia(titulo, texto, autorId);
      return { message: 'Noticia inserida com sucesso' };
    } catch (err) {
      console.log({ err });
      throw err;
    }
  }

  async getNoticia(id) {
    try {
      const noticia = await NoticiasRepository.getNoticia(id);
      return noticia;
    } catch (err) {
      console.log({ err });
      throw err;
    }
  }

  async getAllNoticias() {
    try {
      const noticias = await NoticiasRepository.getAllNoticias();
      return noticias;
    } catch (err) {
      console.log({ err });
      throw err;
    }
  }
}

export default new NoticiasService();
