import Validator from 'validatorjs';
import dotenv from 'dotenv';
import db from '../models';
import { errorHandler, generatePaginationMeta } from '../utils/helper';

dotenv.config();

const Recipe = db.Recipe;
const User = db.User;
const Review = db.Review;
const Voting = db.Voting;
const Favorite = db.Favorite;

const recipeController = {
  /**
   * Create new Recipes
   * @param { object }  req
   * @param { object }  res
   *
   * @returns { object } object
   */
  create(req, res) {
    const body = req.body.recipeDetails;
    const validator = new Validator(body, Recipe.createRules());
    if (validator.passes()) {
      User.findById(req.decoded.id)
        .then((user) => {
          if (!user) {
            return res.status(404).json({
              message: 'This User Does not exit'
            });
          }
          Recipe.findOne({
            where: { name: body.name, userId: req.decoded.id }
          })
            .then((foundRecipe) => {
              if (foundRecipe) {
                return res.status(409).json({
                  message: 'You have this recipe already, please edit it'
                });
              }
              Recipe.create({
                name: body.name,
                description: body.description,
                userId: req.decoded.id,
                ingredient: body.ingredient,
                imageUrl: req.body.imageUrl || ''
              })
                .then(recipe => res.status(201).json({
                  message: 'Recipe creation successful ',
                  recipe
                }))
                .catch(error => res.status(404).json(error));
            })
            .catch(error => res.status(500).json({
              message: 'An error occurred while trying to create this recipe ',
              error: error.message
            }));
        })
        .catch(error => res.status(500).json({ error }));
    } else {
      return res.status(400).json({
        message: 'A validation error occurred',
        errors: validator.errors.all()
      });
    }
  },

  /**
   * Retrieve a Recipe
   * @param { object }  req
   * @param { object }  res
   *
   * @returns { object } object
   */
  retrieve(req, res) {
    return Recipe
      .findById(req.params.recipeId, {
        include: [{
          model: Review,
          as: 'reviews'
        },
        {
          model: Voting,
          as: 'votings'
        },
        {
          model: Favorite,
          as: 'favorites'
        }
        ]
      })
      .then((recipe) => {
        if (!recipe) {
          return Promise.reject({ code: 404, message: 'Recipe not found' });
        }
        return recipe
          .update({ views: recipe.views + 1 });
      })
      .then((recipe) => {
        if (req.decoded && req.decoded.id && req.decoded.id === recipe.userId) {
          recipe.views = 1;
        }
        return res.status(200).json({ recipe });
      })
      .catch(error => errorHandler(error, res));
  },

  /**
   * Update Recipe
   * @param { object }  req
   * @param { object }  res
   *
   * @returns { object } object
   */
  update(req, res) {
    const validator = new Validator(req.body, Recipe.updateRules());
    if (validator.passes()) {
      return Recipe
        .findById(req.params.recipeId)
        .then((recipe) => {
          if (!recipe) {
            return res.status(404).send({
              message: 'Recipe Not Found',
            });
          }
          if (req.decoded.id !== recipe.userId) {
            return res.status(404).json({
              message: 'This User Does not exit'
            });
          }
          return recipe
            .update(req.body, { fields: Object.keys(req.body) })
            .then(() => res.status(201).json({
              message: 'Recipe successfully updated',
              recipe
            }))
            .catch(error => res.status(400).json({
              message: 'Recipe not updated',
              errors: error.errors }));
        })
        .catch(error => res.status(500).json({ errors: error.errors }));
    }
    return res.status(500).json({ message: validator.errors.all() });
  },

  /**
   * Delete Recipe
   * @param { object }  req
   * @param { object }  res
   *
   * @returns { object } object
   */
  destroy(req, res) {
    return Recipe
      .findById(req.params.recipeId)
      .then((recipe) => {
        if (!recipe) {
          return res.status(404).json({ message: 'Recipe not found' });
        }
        if (req.decoded.id !== recipe.userId) {
          return res.status(404).json({
            message: 'This User Does not exit'
          });
        }
        return recipe
          .destroy()
          .then(() => res.status(200).json({
            message: 'Recipe successfully deleted'
          }))
          .catch(error => res.status(500).json({ error }));
      })
      .catch(error => res.status(500).json({ error }));
  },

  /**
   * List all recipes
   * @param { object }  req
   * @param { object }  res
   *
   * @returns { object } object
   */
  list(req, res) {
    // const sortType = req.query.sort || null;
    const limit = req.query.limit || 2;
    const offset = req.query.offset || 0;
    const order = (req.query.order && req.query.order.toLowerCase() === 'desc')
      ? [['createdAt', 'DESC']] : [['createdAt', 'ASC']];
    return Recipe
      .findAndCountAll({
        limit,
        offset,
        order,
      })
      .then(recipes => res.status(200).json(
        {
          paginationMeta: generatePaginationMeta(recipes, limit, offset),
          recipes: recipes.rows
        }))
      .catch(error => res.status(500).json({ error }));
  },
  /**
   * Get user recipe
   * @param { object }  req
   * @param { object }  res
   *
   * @returns { object } object
   */
  getUserRecipe(req, res) {
    const userId = req.params.userId;
    if (Number(userId) !== req.decoded.id) {
      return res.status(400).json({
        message: 'This User Does not exit'
      });
    }
    return User.findById(userId)
      .then((user) => {
        if (!user) {
          return res.status(404).json({
            message: 'This User Does not exit'
          });
        }
        Recipe.findAll({
          where: { userId: req.decoded.id }
        })
          .then((recipes) => {
            if (!recipes) {
              return res.status(404).json({
                message: 'This user has no recipe'
              });
            }
            return res.status(200).json({ recipes });
          })
          .catch(error => res.status(500).json({ error }));
      })
      .catch(error => res.status(500).json({ error }));
  }
};

export default recipeController;

