class AjvError extends Error {
  constructor(err, ...params) {
    super(...params);
    this.status = 401;
    this.message = { ...err };
  }
}

export default AjvError;
