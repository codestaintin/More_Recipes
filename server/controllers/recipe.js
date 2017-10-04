import Validator from 'validatorjs';
import db from '../models';

const sequelize = db.sequelize;

const Recipe = db.Recipe;
const User = db.User;
const Review = db.Review;

const recipeController = {
  /** Create new Recipe
   * @param {*req} req
   * @param {*res} res
   */
  create(req, res) {
    const body = req.body;
    const validator = new Validator(body, Recipe.createRules());
    if (validator.passes()) {
      User.findById(req.decoded.id)
        .then((user) => {
          if (!user) {
            return res.status(404).json({ code: 404, message: 'This User Does not exit' });
          }
          return Recipe.create({
            name: req.body.name,
            description: req.body.description,
            ingredient: req.body.ingredient,
            image: req.body.image,
            userId: req.decoded.id
          })
            .then(recipe => res.status(201).json({ message: 'Recipe creation succesful ', recipe }))
            .catch(error => res.status(404).send(error));
        })
        .catch(error => res.status(404).send(error));
    }
  },
  /**
   * Retrieves a recipe
   * @param {*id}
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

  /** Update Recipe
   * @param{id}
   */
  update(req, res) {
    const body = req.body;
    const validator = new Validator(body, Recipe.updateRules());
    if (validator.passes()) {
      return Recipe
        .findById(req.params.recipeId)
        .then((recipe) => {
          if (!recipe) {
            res.status(404).json({ message: 'Recipe not found in record' });
          }
          return recipe
            .update(req.body, { fields: Object.keys(req.body) });
        })
        .then(updatedRecipe => res.status(200).json({ message: 'Update succesful', updatedRecipe }))
        .catch(error => res.status(400).json({ error }));
    }
  },
  /** Delete Recipe
   * @param{id}
   */
  destroy(req, res) {
    return Recipe
      .findById(req.params.recipeId)
      .then((recipe) => {
        if (!recipe) {
          res.status(404).json({ message: 'Recipe not found' });
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
   * @param {*} req 
   * @param {*} res 
   */
  // list(req, res) {
  //   return Recipe
  //     .findAll({
  //       include: [{
  //         model: Review,
  //         as: 'reviews'
  //       }]
  //     })
  //     .then(recipe => res.status(200).json({ message: 'List of recipes', recipe }))
  //     .catch(error => res.status(400).json(error));
  // },
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
        .catch(() => res.status(400));
    }
    return Recipe
      .findAll()
      .then(recipes => res.status(200).send(recipes))
      .catch(error => res.status(400).send(error));
  },
};

export default recipeController;

