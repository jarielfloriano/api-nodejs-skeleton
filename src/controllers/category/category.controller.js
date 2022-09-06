import Boom from '@hapi/boom';
import categoryService from '../../services/category.service';
import {
  validateGetAllCategoriesQueryParams
} from './category.validator';

export default {
  async getAllCategories(req, res, next) {
    try {
      const queryParams = req.query;
      await validateGetAllCategoriesQueryParams(queryParams);
      const { order, orderDirection } = queryParams;
      const allCategories = await categoryService.getAllCategories({
        order,
        orderDirection,
      });
      return res.status(200).json(allCategories);
    } catch (err) {
      if (err && err.name === 'ValidationError') {
        throw Boom.badRequest(err.errors.shift());
      }
      return next(err);
    }
  },
};
