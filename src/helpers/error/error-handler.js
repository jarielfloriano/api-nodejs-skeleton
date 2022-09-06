import Boom from '@hapi/boom';

export default async (err, req, res, next) => {
  if (Boom.isBoom(err)) {
    return res
      .status(err.output.statusCode)
      .json({ error: err.output.payload });
  }

  // Axios error que não foi pego pelo Boom
  if (err.isAxiosError && err.response && err.response.status) {
    return res.status(err.response.status).json({
      error: {
        statusCode: err.response.status,
        error: err.response.statusText,
        message:
          err.response.data.message ||
          'Ocorreu um erro desconhecido pela aplicação',
      },
    });
  }

  // Se é um erro não tratado
  return res.status(500).json({
    error: {
      statusCode: 500,
      error: 'Internal Server Error',
      message: err.message || 'Ocorreu um erro inesperado',
    },
  });
};
