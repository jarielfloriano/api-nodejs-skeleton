import Boom from '@hapi/boom';
import logger from '../log/logger';

function getMessage(err) {
  let message;
  if (err.response && err.response.data && err.response.data.message) {
    message = err.response.data.message;
  } else if (err.response && err.response.message) {
    message = err.response.message;
  } else if (err.message) {
    message = err.message;
  } else {
    message = 'Ocorreu um erro inesperado!';
  }
  return message;
}

function getStatusCode(err) {
  return (err.response && err.response.status) || 500;
}

export default function throwError(err) {
  logger.error(err.stack);

  if (Boom.isBoom(err)) {
    throw err;
  }

  const message = getMessage(err);
  throw new Boom.Boom(message, {
    statusCode: getStatusCode(err),
    message,
  });
}
