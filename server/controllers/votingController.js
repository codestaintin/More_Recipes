
import db from '../models';

const Voting = db.Voting;
const Recipe = db.Recipe;

const votingController = {
  /**
   * @description up vote recipe controller
   * @param {Object} req - Request object
   * @param {Object} res - Response object
   * @returns {Object} json - payload
   */
  upvote(req, res) {
    Recipe
      .findById(req.params.recipeId)
      .then((recipe) => {
        if (!recipe) {
          return res.status(404).json({
            message: 'Recipe not found'
          });
        }
      });
    Voting.find({
      attributes: ['voting'],
      where: {
        recipeId: req.params.recipeId,
        userId: req.decoded.id
      }
    })
      .then((voting) => {
        if (!voting) {
          Voting
            .create({
              voting: 1,
              recipeId: req.params.recipeId,
              userId: req.decoded.id
            })
            .then(() => {
              Recipe.findById(req.params.recipeId).then((recipe) => {
                recipe.increment('upvotes').then(() => res.status(201).json({
                  message: 'Upvote successful',
                  recipe
                }));
              });
            });
        } else if (voting.voting === 1) {
          Voting.destroy(
            {
              where:
                {
                  recipeId: req.params.recipeId,
                  userId: req.decoded.id
                }
            })
            .then(() => {
              Recipe.findById(req.params.recipeId).then((recipe) => {
                recipe.update({ upvotes: recipe.upvotes - 1 },
                  { fields: ['upvotes'] })
                  .then(() => res.status(200).json({
                    message: 'Upvote removed',
                    recipe
                  }));
              });
            });
        } else if (voting.voting === 0) {
          Voting.update(
            {
              voting: 1
            },
            {
              where:
                {
                  recipeId: req.params.recipeId,
                  userId: req.decoded.id
                }
            })
            .then(() => {
              Recipe
                .findById(req.params.recipeId)
                .then((recipe) => {
                  recipe.update({
                    upvotes: recipe.upvotes + 1,
                    downvotes: recipe.downvotes - 1
                  },
                  { fields: ['upvotes', 'downvotes'] })
                    .then(updatedRecipe => res.status(200).json({
                      message: 'Vote status recorded',
                      recipe: updatedRecipe
                    }));
                });
            });
        }
      })
      .catch(error => res.status(400).json({ message: error.message, error }));
  },

  /**
   * @description down vote recipe controller
   * @param {Object} req - Request object
   * @param {Object} res - Response object
   * @returns {Object} json - payload
   */
  downvote(req, res) {
    Recipe
      .findById(req.params.recipeId)
      .then((recipe) => {
        if (!recipe) {
          return res.status(404).json({
            message: 'Recipe not found'
          });
        }
        Voting
          .find({
            attributes: ['voting'],
            where: {
              recipeId: req.params.recipeId,
              userId: req.decoded.id
            }
          })
          .then((voting) => {
            if (!voting) {
              Voting
                .create({
                  voting: 0,
                  recipeId: req.params.recipeId,
                  userId: req.decoded.id
                })
                .then(() => {
                  Recipe.findById(req.params.recipeId).then((recipe) => {
                    recipe.increment('downvotes').then(() => res.status(201).json({
                      message: 'Downvote Successful',
                      recipe
                    }));
                  });
                });
            } else if (voting.voting === 0) {
              Voting.destroy(
                {
                  where:
                    {
                      recipeId: req.params.recipeId,
                      userId: req.decoded.id
                    }
                })
                .then(() => {
                  Recipe.findById(req.params.recipeId).then((recipe) => {
                    recipe.update({ downvotes: recipe.downvotes - 1 },
                      { fields: ['downvotes'] })
                      .then(() => res.status(200).json({
                        message: 'Voting removed',
                        recipe
                      }));
                  });
                });
            } else if (voting.voting === 1) {
              Voting
                .update(
                  {
                    voting: 0
                  },
                  {
                    where:
                      {
                        recipeId: req.params.recipeId,
                        userId: req.decoded.id
                      }
                  });
              Recipe
                .findById(req.params.recipeId)
                .then((recipe) => {
                  recipe.update({
                    upvotes: recipe.upvotes - 1,
                    downvotes: recipe.downvotes + 1
                  },
                  { fields: ['upvotes', 'downvotes'] })
                    .then(updatedRecipe => res.status(200).json({
                      message: 'Voting recorded',
                      recipe: updatedRecipe
                    }));
                });
            }
          })
          .catch(error => res.status(400).json({ message: error.message }));
      });
  }
};
export default votingController;