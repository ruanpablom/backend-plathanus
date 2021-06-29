class NaoExistemNoticiasError extends Error {
  constructor(...params) {
    super(...params);
    this.status = 400;
    this.message = 'Não existem notícias';
  }
}

export default NaoExistemNoticiasError;
