# More Recipes

## Application Features
More recipes is an application where a anyone can see recipes and method of preparaton of his/her favorite meal. A registered and signed in user can do any of the follwing
- Add a new recipe
- Modify and update his/her own recipes
- Delete a recipe
- Get a catalog of his/her own recipes
- Post a review for an existing recipe
- Make a recipe his/her own recipe a favorite
- Create a category for his/her own recipe
- Upvote or downvote a recipe

## Users who are yet to register can only do the following
- View a recipe
- Register to have access to more features

## Registered Users can
- Create a Recipe
- Edit a recipe
- Make a recipe a favorite
- Post a review about a recipe
- Upvote/downvote a recipe
- Get the recipe with the highest upvotes

# Technologies
- [NodeJS](http://nodejs.org/en) is a JavaScript runtime built on Chrome's V8 JavaScript engine
- [Express JS](http://express.com) A minimalist web framework
- [Sequelize](http://docs.sequelizejs.com/) Sequelize is a promise-based ORM for Node.js v4 and up. It supports the dialects PostgreSQL, MySQL, SQLite and MSSQL and features solid transaction support, relations, read replication and more.
- [PostgreSQL](https://www.postgresql.org/) A powerful, open source object-relational database system.
- [ESLint](eslint.org) provides a pluggable linting utility for JavaScript.
- [Mocha](https://mochajs.org/) Mocha is a feature-rich JavaScript test framework running on [NodeJS](nodejs.org/en) for testing [Javascript](javascript.com) applications.

## Installation
- Install [NodeJS](http://nodejs.org/en) and [PostgreSQL](https://www.postgresql.org/) on your computer
- Clone this repository
- Navigate to the directoty
- Install all depencies with ```npm install```
- Globally install ```sequelize-cli```
- Using ```sequelize db:migrate``` migrate the database
- Start the application by running ```npm start```

## Project Limitation
- An unregistered user can not modify or delete a recipe
- An unregistered user can not post a review about a recipe
- An unregistered user can not favorite a recipe

## User template is available on
- [MoreRecipes](https://codestaintin.github.io/more_recipes_ui)

### Update comming soon
