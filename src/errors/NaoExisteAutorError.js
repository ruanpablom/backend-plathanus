class NaoExisteAutorError extends Error {
  constructor(...params) {
    super(...params);
    this.status = 400;
    this.message = 'Autor não existe';
  }
}

export default NaoExisteAutorError;
