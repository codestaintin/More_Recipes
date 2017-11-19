import userController from '../controllers/userController';
import recipeController from '../controllers/recipeController';
import reviewController from '../controllers/reviewController';
import favoriteController from '../controllers/favoriteController';
import votingController from '../controllers/votingController';
import authMiddleware from '../middleware/auth';

const routes = (router) => {
  router.get('/', (req, res) => {
    res.json({
      status: 'Welcome to Recipe API'
    });
  });
  router.route('/users/signup')
  /** POST api/v1/users/signup - Create a new user */
    .post(userController.create);

  router.route('/users/signin')
  /** POST api/v1/users/signin - Log in a user */
    .post(userController.login);

  router.route('/users/:userId/recipes')
  /** POST api/v1/:userId/recipes - Make a recipes favourite */
    .post(authMiddleware.verifyToken, authMiddleware.verifyUser, favoriteController.create)
  /** GET api/v1/:userId/recipes - Get user favourite recipes */
    .get(authMiddleware.verifyToken, authMiddleware.verifyUser, favoriteController.list);

  router.route('/recipes')
  /**
   * GET api/v1/recipes - Get list of all recipes
   */
    .get(authMiddleware.verifyToken, recipeController.list)
  /**
   * POST api/v1/recipes - Create a new recipe
   */
    .post(authMiddleware.verifyToken, recipeController.create);

  router.route('/recipes/:recipeId')
  /**
   * PUT api/v1/:recipeId - Update an existing recipe
   */
    .put(authMiddleware.verifyToken, recipeController.update)
  /**
     * GET api/v1/:recipeId - Get a recipe
     */
    .get(authMiddleware.verifyToken, recipeController.retrieve)
    /**
     * DELETE api/v1/:recipeID - Delete a recipe
     */
    .delete(authMiddleware.verifyToken, recipeController.destroy);

  router.route('/recipes/:recipeId/reviews')
  /**
   * POST api/v1/:recipeId/reviews - Create a review for a recipe
   */
    .post(authMiddleware.verifyToken, reviewController.create);
  /**
 * POST api/vi/votes/:userId/upVotes
 */
  router.route('/votes/:userId/upVotes')
    .post(authMiddleware.verifyToken, authMiddleware.verifyUser, votingController.upVote);
  /**
 * POST api/vi/votes/:userId/downvote
 */
  router.route('/votes/:userId/downVotes')
    .post(authMiddleware.verifyToken, authMiddleware.verifyUser, votingController.downVote);
};

export default routes;
