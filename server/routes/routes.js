import userController from '../controllers/userController';
import recipeController from '../controllers/recipeController';
import reviewController from '../controllers/reviewController';
import favoriteController from '../controllers/favoriteController';
import votingController from '../controllers/votingController';
import authMiddleware from '../middleware/auth';

const routes = (router) => {
  router.get('/', (req, res) => {
    res.json({
      status: 'Welcome to recipe API'
    });
  });
  router.route('/users/signup')
  /** POST api/v1/users/signup - Create a new user */
    .post(userController.create);

  router.route('/users/signin')
  /** POST api/v1/users/signin - Log in a user */
    .post(userController.login);

  router.route('/users/:userId')
  /** GET api/v1/:userId/ - Get a user */
    .get(authMiddleware.verifyToken,
      authMiddleware.verifyUser,
      userController.retrieve);

  router.route('/recipes/:recipeId/favorite')
  /** POST api/v1/:userId/recipes - Make a recipes favourite */
    .post(authMiddleware.verifyToken, authMiddleware.verifyUser,
      favoriteController.create);

  router.route('/users/:userId/recipes')
  /** GET api/v1/:userId/recipes - Get user favourite recipes */
    .get(authMiddleware.verifyToken, authMiddleware.verifyUser,
      favoriteController.list);

  router.route('/users/:userId/my-recipes')
  /** GET api/v1/:userId/recipes - Get recipes created by a user */
    .get(authMiddleware.verifyToken, authMiddleware.verifyUser,
      recipeController.getUserRecipe);

  router.route('/recipes')
  /**
   * GET api/v1/recipes - Get list of all recipes
   */
    .get(recipeController.list)
    /**
     * POST api/v1/recipes - Create a new recipe
     */
    .post(authMiddleware.verifyToken, recipeController.create);

  router.route('/recipes/:recipeId')
  /**
   * PUT api/v1/recipes/:recipeId - Update an existing recipe
   */
    .put(authMiddleware.verifyToken, recipeController.update)
    /**
     * GET api/v1/recipes/:recipeId - Get a recipe
     */
    .get(authMiddleware.verifyToken, recipeController.retrieve)
    /**
     * DELETE api/v1/recipes/:recipeID - Delete a recipe
     */
    .delete(authMiddleware.verifyToken, recipeController.destroy);

  router.route('/recipes/:recipeId/reviews')
  /**
   * POST api/v1/:recipeId/reviews - Create a review for a recipe
   */
    .post(authMiddleware.verifyToken, reviewController.create)
    /**
     * GET api/v1/:recipeId/reviews - Get all recipe reviews
     */
    .get(authMiddleware.verifyToken, reviewController.list);
  /**
   * POST api/v1/votes/:userId/upVotes
   */
  router.route('/recipe/:recipeId/upVote')
    .put(authMiddleware.verifyToken, authMiddleware.verifyUser,
      votingController.upvote);
  /**
   * POST api/v1/votes/:userId/downvote
   */
  router.route('/recipe/:recipeId/downVote')
    .put(authMiddleware.verifyToken, authMiddleware.verifyUser,
      votingController.downvote);
};

export default routes;