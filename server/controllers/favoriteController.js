import db from '../models';

const Favorite = db.Favorite;
const Recipe = db.Recipe;

const favoriteController = {

  /**
   * Create auth favorite
   *
   * @param { object } req
   * @param { object } res
   * 
   * @returns { object } object
   */
  create(req, res) {
    Favorite.findOne({
      where: {
        recipeId: req.body.recipeId,
        userId: req.decoded.id
      }
    })
      .then((foundFavorite) => {
        if (foundFavorite) {
          return Promise.resolve(foundFavorite);
        }
        return Favorite.create({
          recipeId: req.body.recipeId,
          userId: req.decoded.id
        });
      })
      .then(favorite => res.status(201).json({
        message: 'Recipe successfully made your favorite',
        favorite
      }))
      .catch(error => res.status(500).json({
        message: error.message ? error.message : 'An error occured during this operation',
        error: error.errors
      }));
  },

  /**
   * List all auth Favorite
   *
   * @param { object } req
   * @param { object } res
   * 
   * @returns { object } object
   */
  list(req, res) {
    Favorite.findAll({
      where: { userId: req.params.userId },
      include: [{
        model: Recipe,
      }]
    })
      .then(favorites => res.status(200).json({ favorites }))
      .catch(error => res.status(500).json({ error: error.message }));
  }
};

export default favoriteController;
