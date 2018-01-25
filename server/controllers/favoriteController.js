import db from '../models';
import { generatePaginationMeta } from '../utils/helper';


const Favorite = db.Favorite;
const Recipe = db.Recipe;
const User = db.User;

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
        message: error.message ? error.message : 'An error occurred during this operation',
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
    const limit = req.query.limit || 8;
    const offset = req.query.offset || 0;
    const order = (req.query.order && req.query.order.toLowerCase() === 'desc')
      ? [['createdAt', 'DESC']] : [['createdAt', 'ASC']];
    Favorite.findAndCountAll({
      limit,
      offset,
      order,
      where: { userId: req.params.userId },
      include: [
        {
          model: Recipe,
          include: [
            {
              model: User, attributes: ['username']
            }
          ]
        }
      ]
    })
      .then(favorites => res.status(200).json({
        paginationMeta: generatePaginationMeta(favorites, limit, offset),
        favorites: favorites.rows
      }))
      .catch(error => res.status(500).json({ error: error.message }));
  }
};

export default favoriteController;
