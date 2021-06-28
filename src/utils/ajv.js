import Ajv from 'ajv';
import AjvErrors from 'ajv-errors';

class AjvUtils {
  constructor() {
    this.ajv = new Ajv({
      allErrors: true,
      jsonPointers: true,
    });
    AjvErrors(this.ajv);
  }

  validate(body, schema, file) {
    // eslint-disable-next-line import/no-dynamic-require
    const json = require(`${schema}/${file}.json`);
    const validate = this.ajv.compile(json);
    if (!validate(body)) {
      const messages = [];
      validate.errors.forEach((error) => {
        messages.push({ message: error.message });
      });

      const err = {
        messages,
      };

      err.name = 'validation';
      throw err;
    }
  }
}

export default new AjvUtils();
