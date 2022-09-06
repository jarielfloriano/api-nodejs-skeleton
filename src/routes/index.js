import categoryController from '../controllers/category/category.controller'

export default app => {
  app.get('/ping', (req, res) => res.status(200).send({ message: 'pong' }));
  app.get('/categories', categoryController.getAllCategories);
  
  // Define como 404 qualquer outra rota
  app.all('*', (req, res) => res.status(404).send({}));
};
