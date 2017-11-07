import db from '../models';

const Favorite = db.Favorite;
const Recipe = db.Recipe;

const favoriteController = {

  /**
   * Create User favorite
   * 
   * @param {any} req 
   * @param {any} res 
   * @returns {object} object
   */
  create(req, res) {
    Favorite.findOne({
      where: {
        recipeId: req.body.recipeId,
        userId: req.decoded.id
      }
    })
      .then((favorite) => {
        if (favorite) {
          return res.status(404).json({
            code: 404,
            message: 'This recipe is already your favorite'
          });
        }
        return Favorite.create({
          recipeId: req.body.recipeId,
          userId: req.decoded.id
        });
      })
      .then((isFavorite) => {
        return res.status(200).json({
          code: 200,
          message: 'Recipe successfully made your favorite',
          data: isFavorite
        });
      })
      .catch(error => res.status(400).json({
        message: 'An error occured during this operation',
        error: error.errors
      }));
  },

  /**
   * List all User Favorite
   * 
   * @param {any} req 
   * @param {any} res 
   * @returns {object} object
   */
  list(req, res) {
    Favorite.findAll({
      where: { userId: req.params.userId },
      include: [{
        model: Recipe,
      }]
    })
      .then((favorites) => {
        return res.status(200).json({ message: 'User Favorites', favorites });
      })
      .catch(error => res.status(400).json({ error: error.message }));
  }
};

export default favoriteController;
