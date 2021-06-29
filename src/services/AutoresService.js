import AutoresRepository from '../repositories/AutoresRepository';

class AutoresService {
  async inserirAutor(nome) {
    try {
      const autor = await AutoresRepository.inserirAutor(nome);
      return autor;
    } catch (err) {
      console.log({ err });
      throw err;
    }
  }

  async todosAutores() {
    try {
      const autores = await AutoresRepository.todosAutores();
      return autores;
    } catch (err) {
      console.log({ err });
      throw err;
    }
  }

  async getAutor(id) {
    try {
      const autor = await AutoresRepository.getAutor(id);
      return autor;
    } catch (err) {
      console.log({ err });
      throw err;
    }
  }
}

export default new AutoresService();
