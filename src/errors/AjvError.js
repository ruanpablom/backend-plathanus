class AjvError extends Error {
  constructor(err, ...params) {
    super(...params);
    this.status = 400;
    this.message = { ...err };
  }
}

export default AjvError;
