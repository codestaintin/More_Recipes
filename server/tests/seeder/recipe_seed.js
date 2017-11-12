import db from '../../models';

const Recipe = db.Recipe;

const seeder = {
  emptyRecipeTable(done) {
    Recipe.destroy({ truncate: true, cascade: true })
      .then(() => done())
      .catch(err => done(err));
  },
  setInput(name, ingredient, description, image, views) {
    return {
      name,
      ingredient,
      description,
      image,
      views
    };
  },
  setUpdateRecipe(name, ingredient, description, image, views) {
    return {
      name,
      ingredient,
      description,
      image,
      views
    };
  },
  addRecipe(done) {
    Recipe.create({
      name: 'Yam Porridge',
      ingredient: 'Yam, pepper, and water',
      description: 'This is how to make ya porridge',
      image: 'yam_img',
      views: 9
    })
      .then(() => done())
      .catch(err => done(err));
  }
};

export default seeder;
