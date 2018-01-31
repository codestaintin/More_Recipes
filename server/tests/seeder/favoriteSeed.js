import db from '../../models';

const Favorite = db.Favorite;

const favoriteSeed = {
  emptyFavoriteTable(done) {
    Favorite.destroy({ truncate: true, cascade: true })
      .then(() => done())
      .catch(err => done(err));
  },
  setInput(recipeId) {
    return {
      recipeId
    };
  },
  addFavorite(done) {
    Favorite.create({
      recipeId: 1
    })
      .then(() => done())
      .catch(err => done(err));
  }
};

export default favoriteSeed;