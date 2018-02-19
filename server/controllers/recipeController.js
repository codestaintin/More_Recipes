import Validator from 'validatorjs';
import dotenv from 'dotenv';
import Sequelize from 'sequelize';
import db from '../models';
import { errorHandler, generatePaginationMeta } from '../utils/helper';

dotenv.config();

const Op = Sequelize.Op;
const Recipe = db.Recipe;
const User = db.User;
const Voting = db.Voting;
const Favorite = db.Favorite;

const recipeController = {
  /**
   * @description - Create new Recipes
   * 
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
              message: 'Please log in to create a recipe'
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
                .catch(error => res.status(400).json(error));
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
   * @description - Retrieve a recipe
   * 
   * @param { object }  req
   * @param { object }  res
   *
   * @returns { object } object
   */
  retrieve(req, res) {
    return Recipe
      .findById(req.params.recipeId, {
        include: [
          {
            model: Voting,
            as: 'votings'
          },
          {
            model: Favorite,
            as: 'favorites'
          },
          {
            model: User,
            attributes: ['username']
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
   * @description - Update recipe
   * 
   * @param { object }  req
   * @param { object }  res
   *
   * @returns { object } object
   */
  update(req, res) {
    const validator = new Validator(req.body, Recipe.createRules());
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
              message: 'You have no access to edit this recipe'
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
   * @description - Delete recipe
   * 
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
            message: 'You have no access to edit this recipe'
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
   * @description - List all recipes
   * 
   * @param { object }  req
   * @param { object }  res
   *
   * @returns { object } object
   */
  list(req, res) {
    const page = (req.query.page <= 0 || req.query.page === undefined) ? 0 : req.query.page - 1;
    const limit = req.query.limit || 4;
    const offset = limit * page;
    const order = (req.query.order && req.query.order.toLowerCase() === 'desc')
      ? [['createdAt', 'DESC']] : [['createdAt', 'ASC']];
    return Recipe
      .findAndCountAll({
        limit,
        offset,
        order,
        include: [{ model: User, attributes: ['username'] }]
      })
      .then((recipes) => {
        if (recipes.length === 0) {
          return res.status(200).json({
            message: 'You have no recipes yet'
          });
        }
        return res.status(200).json({
          paginationMeta: generatePaginationMeta(recipes, limit, page),
          recipes: recipes.rows
        });
      })
      .catch(error => res.status(500).json({ error }));
  },
  /**
   * @description - Get user recipe
   * 
   * @param { object }  req
   * @param { object }  res
   *
   * @returns { object } object
   */
  getUserRecipe(req, res) {
    const page = (req.query.page <= 0 || req.query.page === undefined) ? 0 : req.query.page - 1;
    const limit = req.query.limit || 4;
    const offset = page * limit;
    const order = (req.query.order && req.query.order.toLowerCase() === 'desc')
      ? [['createdAt', 'DESC']] : [['createdAt', 'ASC']];
    const userId = req.decoded.id;
    return User.findById(userId)
      .then((user) => {
        if (!user) {
          return res.status(404).json({
            message: 'This User Does not exit'
          });
        }
        Recipe.findAndCountAll({
          limit,
          offset,
          order,
          where: { userId: req.decoded.id },
          include: [{ model: User, attributes: ['username'] }]
        })
          .then((recipes) => {
            if (recipes.length === 0) {
              return res.status(200).json({
                message: 'You have no recipes yet!'
              });
            }
            return res.status(200).json({
              message: 'This are your recipes',
              paginationMeta: generatePaginationMeta(recipes, limit, page),
              recipes: recipes.rows
            });
          })
          .catch(error => res.status(500).json({ error }));
      })
      .catch(error => res.status(500).json({ error }));
  },
  /**
   * @description - Search recipe
   * 
   * @param { object }  req
   * @param { object }  res
   *
   * @returns { object } object
   */
  searchRecipe(req, res) {
    const { search: query } = req.query;
    const page = (req.query.page <= 0 || req.query.page === undefined) ? 0 : req.query.page - 1;
    const limit = req.query.limit || 4;
    const offset = page * limit;
    const order = (req.query.order && req.query.order.toLowerCase() === 'desc')
      ? [['createdAt', 'DESC']] : [['createdAt', 'ASC']];
    Recipe
      .findAndCountAll({
        limit,
        offset,
        order,
        where: {
          [Op.or]: [
            {
              name: {
                [Op.iLike]: `%${query}%`
              }
            },
            {
              ingredient: {
                [Op.iLike]: `%${query}%`,
              }
            }
          ]

        },
        include: [{ model: User, attributes: ['username'] }]
      }).then(recipeFound => res.status(200).json({
        paginationMeta: generatePaginationMeta(recipeFound, limit, page),
        recipeFound: recipeFound.rows
      }))
      .catch(() => res.status(500).json({ error: 'Internal server error' }));
  }
};

export default recipeController;

