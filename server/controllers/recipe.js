import Validator from 'validatorjs';
import db from '../models';

const sequelize = db.sequelize;
const Recipe = db.Recipe;
const User = db.User;
const Review = db.Review;

const recipeController = {
  /**
   * Create new Recipes
   * @param {any} req 
   * @param {any} res 
   * @returns {object} object
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
                ingredient: body.ingredient
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
   * @param {any} req 
   * @param {any} res 
   * @returns {object} object
   */
  retrieve(req, res) {
    return Recipe
      .findById(req.params.recipeId, {
        include: [{
          model: Review,
          as: 'reviews'
        }]
      })
      .then((recipe) => {
        if (!recipe) {
          res.status(404).json({ message: 'Recipe not found' });
        }
        return recipe
          .update({ views: recipe.views + 1 });
      })
      .then((recipe) => {
        if (!recipe) {
          res.status(404).json({ message: 'Recipe not found' });
        }
        if (req.decoded && req.decoded.id && req.decoded.id === recipe.userId) recipe.views = 1;
        res.status(200).json({ recipe });
      })
      .catch(error => res.status(400).json({ error }));
  },

  /**
   * Update Recipe 
   * @param {any} req 
   * @param {any} res 
   * @returns {object} object
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
          })
          .then(() => res.status(200).json({ message: 'Recipe succesfully updated', recipe }))
          .catch(error => res.status(400).json({ message: 'Recipe not updated', errors: error.errors }));
      })
      .catch(error => res.status(400).json({ errors: error.errors }));
  },

  /**
   * Delete Recipe
   * @param {any} req 
   * @param {any} res 
   * @returns {object} object
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
          .then(() => res.status(200).json({ message: 'Recipe deleted' }))
          .catch(error => res.status(400).json(error));
      })
      .catch(error => res.status(400).json(error));
  },

  /**
   * List all recipes
   * @param {any} req 
   * @param {any} res 
   * @returns {object} object
   */
  list(req, res) {
    const sortType = req.query.sort || null;
    const orderType = req.query.order || null;
    if ((sortType != null) || (orderType !== null)) {
      return sequelize.query(`
                          SELECT DISTINCT
                          (SELECT COUNT(id) FROM "Votings" WHERE "recipeId"=a.id AND vote=1) AS upvotes,
                          (SELECT COUNT(id) FROM "Votings" WHERE "recipeId"=a.id AND vote=0) AS downvotes,
                          a.* FROM "Recipes" a
                          LEFT JOIN "Votings" b ON a.id = b."recipeId" ORDER BY upvotes DESC`, { type: sequelize.QueryTypes.SELECT })
        .then(recipes => res.status(200).json({ message: 'All Recipes displayed', recipes }))
        .catch(() => res.status(400).json({ message: 'An error occured during this operation' }));
    }
    return Recipe
      .findAll({
        include: [{ model: Review, as: 'reviews' }]
      })
      .then(recipes => res.status(200).json(recipes))
      .catch(error => res.status(400).json(error));
  },
};

export default recipeController;

