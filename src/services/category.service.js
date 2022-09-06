import Boom from '@hapi/boom';
import model from '../models';
import throwError from '../helpers/error/throw-error';

const { category } = model;

const getAllCategories = async filter => {
  try {
	  await category.sync();
	  const categories = await category.findAll({
      attributes: [
        'id',
        'name'
      ],
      raw: true,
      order: [[filter.order ?? 'name', filter.orderDirection ?? 'asc']],
    });
    return categories;
  } catch (err) {
    return throwError(err);
  }
};

export default {
  getAllCategories,
};
