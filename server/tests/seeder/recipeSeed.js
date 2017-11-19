import db from '../../models';

const Recipe = db.Recipe;

const recipeSeed = {
  emptyRecipeTable(done) {
    Recipe.destroy({ truncate: true, cascade: true })
      .then(() => done())
      .catch(err => done(err));
  },
  setInput(name, ingredient, description, imageUrl, views) {
    return {
      name,
      ingredient,
      description,
      imageUrl,
      views
    };
  },
  setUpdateRecipe(name, ingredient, description, imageUrl, views) {
    return {
      name,
      ingredient,
      description,
      imageUrl,
      views
    };
  },
  addRecipe(done) {
    Recipe.create({
      name: 'Yam Porridge',
      ingredient: 'Yam, pepper, and water',
      description: 'This is how to make ya porridge',
      userId: 1,
      imageUrl: 'yam_img',
      views: 0
    })
      .then(() => done())
      .catch(err => done(err));
  }
};

export default recipeSeed;
