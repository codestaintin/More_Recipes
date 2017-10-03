import Validator from 'validatorjs';
import db from '../models';

const Recipe = db.Recipe;
const User = db.User;
const Review = db.Review;

const recipeController = {
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

  //   retrieve(req, res) {
  //     return Recipe
  //       .findById(req.params.recipeId, {
  //         include: [{
  //           model: Review,
  //           as: 'reviews'
  //         }]
  //       })
  //       .then((recipe) => {
  //         if (!recipe) {
  //           res.status(404).json({ message: 'Recipe not found' });
  //         }
  //         res.status(200).json({ recipe });
  //       })
  //       .catch(error => res.status(400).json({ error }));
  //   },

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

  list(req, res) {
    return Recipe
      .findAll({
        include: [{
          model: Review,
          as: 'reviews'
        }]
      })
      .then(recipe => res.status(200).json({ message: 'List of recipes', recipe }))
      .catch(error => res.status(400).json(error));
  },
};

export default recipeController;

