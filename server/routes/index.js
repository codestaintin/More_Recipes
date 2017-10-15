import userCtrl from '../controllers/user';
import recipeCtrl from '../controllers/recipe';
import reviewCtrl from '../controllers/review';
import favoriteCtrl from '../controllers/favourite';
import votingCtrl from '../controllers/votings';
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

  router.route('/users/:userId/recipes')
  /** POST api/v1/:userId/recipes - Make a recipes favourite */
    .post(authMiddleware.verifyToken, authMiddleware.verifyUser, favoriteCtrl.create)
  /** GET api/v1/:userId/recipes - Get user favourite recipes */
    .get(authMiddleware.verifyToken, authMiddleware.verifyUser, favoriteCtrl.list);

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
   * PUT api/v1/:recipeId - Update an existing recipe
   */
    .put(authMiddleware.verifyToken, recipeCtrl.update)
  /**
     * GET api/v1/:recipeId - Get a recipe
     */
    .get(authMiddleware.verifyToken, recipeCtrl.retrieve)
    /**
     * DELETE api/v1/:recipeID - Delete a recipe
     */
    .delete(authMiddleware.verifyToken, recipeCtrl.destroy);

  router.route('/recipes/:recipeId/reviews')
  /**
   * POST api/v1/:recipeId/reviews - Create a review for a recipe
   */
    .post(authMiddleware.verifyToken, reviewCtrl.create);
  /**
 * POST api/vi/votes/:userId/upVotes
 */
  router.route('/votes/:userId/upVotes')
    .post(authMiddleware.verifyToken, authMiddleware.verifyUser, votingCtrl.upVote);
  /**
 * POST api/vi/votes/:userId/downvote
 */
  router.route('/votes/:userId/downVotes')
    .post(authMiddleware.verifyToken, authMiddleware.verifyUser, votingCtrl.downVote);
};

export default routes;
