import Validator from 'validatorjs';
import db from '../models';
import { errorHandler, generatePaginationMeta } from '../utils/helper';

const sequelize = db.sequelize;
const Recipe = db.Recipe;
const User = db.User;
const Review = db.Review;
const Voting = db.Voting;
const Favorite = db.Favorite;

const recipeController = {
  /**
   * Create new Recipes
   * @param { req } HTTP request
   * @param { res } HTTP response
   */
  create(req, res) {
    const body = req.body;
    const validator = new Validator(body, Recipe.createRules());
    if (validator.passes()) {
      User.findById(req.decoded.id)
        .then((user) => {
          if (!user) {
            return res.status(404).json({ message: 'This User Does not exit' });
          }
          Recipe.findOne({
            where: { name: body.name, userId: req.decoded.id }
          })
            .then((recipe) => {
              if (recipe) {
                return res.status(404).json({ message: 'You have this recipe already, please edit it' });
              }
              Recipe.create({
                name: body.name,
                description: body.description,
                userId: req.decoded.id,
                ingredient: body.ingredient,
                image: body.image
              })
                .then(newRecipe => res.status(201).json({ message: 'Recipe creation succesful ', newRecipe }))
                .catch(error => res.status(404).json(error));
            })
            .catch((error) => {
              return res.status(500).json('An error occured while trying to create this recipe ', error.message);
            });
        })
        .catch(error => res.status(404).json(error));
    } else {
      return res.status(401).json({ message: validator.errors.all() });
    }
  },

  /**
   * Retrieve a Recipe
   * @param { req } HTTP request
   * @param { res } HTTP response
   * @returns { obj } object
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
        if (req.decoded && req.decoded.id && req.decoded.id === recipe.userId) recipe.views = 1;
        return res.status(200).json({ recipe });
      })
      .catch((error) => {
        return errorHandler(error, res);
      });
  },

  /**
   * Update Recipe
   * @param { req } HTTP request
   * @param { res } HTTP response
   * @returns { obj } object
   */
  update(req, res) {
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
            message: 'Only the creator of this recipe is permitted this action'
          });
        }
        return recipe
          .update({
            name: req.body.name || recipe.name,
            description: req.body.description || recipe.description,
            ingredients: req.body.ingredients || recipe.ingredients,
            image: req.body.image || recipe.image
          })
          .then(() => res.status(200).json({ message: 'Recipe succesfully updated', recipe }))
          .catch(error => res.status(400).json({ message: 'Recipe not updated', errors: error.errors }));
      })
      .catch(error => res.status(400).json({ errors: error.errors }));
  },

  /**
   * Delete Recipe
   * @param { req } HTTP request
   * @param { res } HTTP response
   * @returns { obj } object
   */
  destroy(req, res) {
    return Recipe
      .findById(req.params.recipeId)
      .then((recipe) => {
        if (!recipe) {
          res.status(404).json({ message: 'Recipe not found' });
        }
        if (req.decoded.id !== recipe.userId) {
          return res.status(404).json({
            message: 'Only the creator of this recipe is permitted this action'
          });
        }
        return recipe
          .destroy()
          .then(() => res.status(200).json({ message: 'Recipe succesfully deleted' }))
          .catch(error => res.status(400).json(error));
      })
      .catch(error => res.status(400).json(error));
  },

  /**
   * List all recipes
   * @param { req } HTTP request
   * @param { res } HTTP response
   * @returns { obj } object
   */
  list(req, res) {
    // const sortType = req.query.sort || null;
    const limit = req.query.limit || 2;
    const offset = req.query.offset || 0;
    const order = (req.query.order && req.query.order.toLowerCase() === 'desc')
      ? [['createdAt', 'DESC']] : [['createdAt', 'ASC']];
    console.log(req.query.order, '>>>>>>');

    return Recipe
      .findAndCountAll({
        limit,
        offset,
        order,
      })
      .then(recipes => res.status(200).json(
        { message: 'All Recipes displayed',
          pagimationMeta: generatePaginationMeta(recipes, limit, offset),
          recipes: recipes.rows
        }))
      .catch(error => res.status(400).json({ error }));
  },
};

export default recipeController;

