import Yup from '../../helpers/validation/Yup';

export async function validateGetAllCategoriesQueryParams(queryParams) {
  const yupSchema = Yup.object().shape({
    order: Yup.string().oneOf([
      'id',
      'name',
    ]),
    orderDirection: Yup.string().oneOf(['asc', 'desc']),
  });
  return yupSchema.validate(queryParams);
}
