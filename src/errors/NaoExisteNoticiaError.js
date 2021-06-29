class NaoExisteNoticiaError extends Error {
  constructor(...params) {
    super(...params);
    this.status = 400;
    this.message = 'Notícia não existe';
  }
}

export default NaoExisteNoticiaError;
