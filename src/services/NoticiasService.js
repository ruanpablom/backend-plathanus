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

  async updateNoticia(id, titulo, texto, autorId) {
    try {
      const noticia = await NoticiasRepository.updateNoticia(id, titulo, texto, autorId);
      return noticia;
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
      return noticias.length !== 0 ? noticias : 'Não existem noticias cadastradas';
    } catch (err) {
      console.log({ err });
      throw err;
    }
  }

  async filterNoticias(filter) {
    try {
      const noticias = await NoticiasRepository.filterNoticias(filter);
      return noticias.length !== 0 ? noticias : `'${filter}' não encontrado`;
    } catch (err) {
      console.log({ err });
      throw err;
    }
  }

  async deleteNoticia(id) {
    try {
      await NoticiasRepository.deleteNoticia(id);
      return 'Noticia excluida';
    } catch (err) {
      console.log({ err });
      throw err;
    }
  }
}

export default new NoticiasService();
