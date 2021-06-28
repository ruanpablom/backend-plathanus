class NaoExistemAutoresError extends Error {
  constructor(...params) {
    super(...params);
    this.status = 400;
    this.message = 'Não existem autores cadastrados';
  }
}

export default NaoExistemAutoresError;
