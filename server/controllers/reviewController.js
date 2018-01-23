import Validator from 'validatorjs';
import db from '../models';

const Review = db.Review;
const Recipe = db.Recipe;
const User = db.User;

const reviewController = {

  /**
   * Create a recipe Review
   *
   * @param { object } req
   * @param { object } res
   *
   * @return { object } object
   */
  create(req, res) {
    const validator = new Validator(req.body, Review.createRules());
    if (validator.passes()) {
      Recipe.findById(req.params.recipeId)
        .then((foundRecipe) => {
          if (!foundRecipe) {
            return res.status(404).json({
              message: 'This recipe Does not exit'
            });
          }
          return Review.create({
            content: req.body.content,
            recipeId: req.params.recipeId,
            userId: req.decoded.id
          })
            .then(recipe => res.status(201).json({
              message: 'Review Posted',
              recipe
            }))
            .catch(error => res.status(500).json(error));
        })
        .catch(error => res.status(500).json(error));
    } else {
      return res.status(400).json({
        message: 'A validation error occurred',
        errors: validator.errors.all()
      });
    }
  },

  /**
   * List all Reviews
   *
   * @param { object } req
   * @param { object } res
   * @returns { object } object
   */
  list(req, res) {
    return Review
      .findAll({
        where: {
          recipeId: req.params.recipeId
        },
        include: [{ model: User, as: 'users', attributes: ['username'] }]
      })
      .then(review => res.status(200).json(review))
      .catch(error => res.status(500).json(error));
  }
};

export default reviewController;
