const HTTPStatus = require('http-status');

function onSuccess(res, data) {
  return res.status(HTTPStatus.OK).json({
    response: data,
  });
}

function onError(res, err) {
  if (err) {
    const errorCode = err.status || err.errorCode;
    switch (errorCode) {
      case 500:
        res.status(HTTPStatus.INTERNAL_SERVER_ERROR).send(err.message || HTTPStatus[500]);
        break;
      case 400:
        res.status(HTTPStatus.BAD_REQUEST).send(err.message || HTTPStatus[400]);
        break;
      case 401:
        res.status(HTTPStatus.UNAUTHORIZED).send(err.message || HTTPStatus[401]);
        break;
      case 403:
        res.status(HTTPStatus.FORBIDDEN).send(err.message || HTTPStatus[403]);
        break;
      case 404:
        res.status(HTTPStatus.NOT_FOUND).send(err.message || HTTPStatus[404]);
        break;
      case 409:
        res.status(HTTPStatus.CONFLICT).send(err.message || HTTPStatus[409]);
        break;
      default:
        res.status(HTTPStatus.INTERNAL_SERVER_ERROR).send(err.message || HTTPStatus[500]);
        break;
    }
  } else {
    res.status(HTTPStatus.INTERNAL_SERVER_ERROR).send(HTTPStatus[500]);
  }
}

module.exports = {
  onError,
  onSuccess,
};
