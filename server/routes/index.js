import userCtrl from '../controllers/user';
import recipeCtrl from '../controllers/recipe';
import reviewCtrl from '../controllers/review';
import authMiddleware from '../middleware/auth';

const routes = (router) => {
  router.get('/', (req, res) => {
    res.json({
      status: 'Welcome to Recipe API'
    });
  });
  router.route('/users/signup')
  /** POST api/v1/users/signup - Create a new user */
    .post(userCtrl.create);

  router.route('/users/signin')
  /** POST api/v1/users/signin - Log in a user */
    .post(userCtrl.login);

  router.route('/recipes')
  /**
   * GET api/v1/recipes - Get list of all recipes
   */
    .get(authMiddleware.verifyToken, recipeCtrl.list)
  /**
   * POST api/v1/recipes - Create a new recipe
   */
    .post(authMiddleware.verifyToken, recipeCtrl.create);

  router.route('/recipes/:recipeId')
  /**
   * PUT api/v1/:recipe_id - Update an existing recipe
   */
    .put(authMiddleware.verifyToken, recipeCtrl.update);

  router.route('/recipes/:recipeId/reviews')
  /**
   * POST api/v1/:recipe_id/reviews - Create a review for a recipe
   */
    .post(authMiddleware.verifyToken, reviewCtrl.create);
};

export default routes;
