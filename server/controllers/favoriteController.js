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
        recipeId: req.params.recipeId,
        userId: req.decoded.id
      }
    })
      .then((foundFavorite) => {
        if (foundFavorite) {
          return Promise.resolve(foundFavorite);
        }
        return Favorite.create({
          recipeId: req.params.recipeId,
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
   * Delete user favorite
   *
   * @param { object } req
   * @param { object } res
   *
   * @returns { object } object
   */
  destroy(req, res) {
    const { recipeId } = req.params;
    return Favorite
      .find({
        where: {
          recipeId
        }
      })
      .then((favorite) => {
        if (!favorite) {
          return res.status(404).json({ message: 'Favorite not found' });
        }
        return favorite
          .destroy()
          .then(() => res.status(200).json({
            message: 'Favorite successfully deleted'
          }))
          .catch(error => res.status(500).json({ error }));
      })
      .catch(error => res.status(500).json({ error }));
  },

  /**
   * List all User Favorite
   *
   * @param { object } req
   * @param { object } res
   * 
   * @returns { object } object
   */
  list(req, res) {
    const page = (req.query.page <= 0 || req.query.page === undefined) ? 0 : req.query.page - 1;
    const limit = req.query.limit || 4;
    const offset = page * limit;
    const order = (req.query.order && req.query.order.toLowerCase() === 'desc')
      ? [['createdAt', 'DESC']] : [['createdAt', 'ASC']];
    Favorite.findAndCountAll({
      limit,
      offset,
      order,
      where: { userId: req.decoded.id },
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
      .then((favorites) => {
        if (favorites.length === 0) {
          return res.status(200).json({
            message: 'You have no favorite recipes yet'
          });
        }
        return res.status(200).json({
          paginationMeta: generatePaginationMeta(favorites, limit, page),
          recipes: favorites.rows
        });
      })
      .catch(error => res.status(500).json({ error: error.message }));
  },

  /**
   * List all Favorites
   *
   * @param { object } req
   * @param { object } res
   *
   * @returns { object } object
   */
  listAll(req, res) {
    const page = (req.query.page <= 0 || req.query.page === undefined) ? 0 : req.query.page - 1;
    const limit = req.query.limit || 4;
    const offset = limit * page;
    const order = (req.query.order && req.query.order.toLowerCase() === 'desc')
      ? [['createdAt', 'DESC']] : [['createdAt', 'ASC']];
    Favorite.findAndCountAll({
      limit,
      offset,
      order,
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
        paginationMeta: generatePaginationMeta(favorites, limit, page),
        favorites: favorites.rows
      }))
      .catch(error => res.status(500).json({ error: error.message }));
  }
};

export default favoriteController;
