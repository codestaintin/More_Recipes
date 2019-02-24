# More Recipes  [![Build Status](https://travis-ci.org/codestaintin/More_Recipes.svg?branch=develop)](https://travis-ci.org/codestaintin/More_Recipes) [![Coverage Status](https://coveralls.io/repos/github/codestaintin/More_Recipes/badge.svg?branch=develop)](https://coveralls.io/github/codestaintin/More_Recipes?branch=develop) [![Maintainability](https://api.codeclimate.com/v1/badges/ab6da5612815d0af82b6/maintainability)](https://codeclimate.com/github/codestaintin/More_Recipes/maintainability)

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
- View favorite recipes

# Technologies
### Backend
- [NodeJS](http://nodejs.org/en) is a JavaScript runtime built on Chrome's V8 JavaScript engine
- [Express JS](http://express.com) A minimalist web framework
- [Sequelize](http://docs.sequelizejs.com/) Sequelize is a promise-based ORM for Node.js v4 and up. It supports the dialects PostgreSQL, MySQL, SQLite and MSSQL and features solid transaction support, relations, read replication and more.
- [PostgreSQL](https://www.postgresql.org/) A powerful, open source object-relational database system.
- [ESLint](eslint.org) provides a pluggable linting utility for JavaScript.
- [Mocha](https://mochajs.org/) Mocha is a feature-rich JavaScript test framework running on [NodeJS](nodejs.org/en) for testing [Javascript](javascript.com) applications.

### Frontend
- [Bootstrap](https://getbootstrap.com/) makes styling responsive web pages faster and easier.
- [React](https://facebook.github.io/react/) A JavaScript library for building user interfaces.
- [Redux](http://redux.js.org/) A predictable state container for JavaScript apps.
- [Webpack](https://webpack.js.org/) A JavaScript tool for bundling scripts, images, styles and other assets
- [Babel](https://babeljs.io/) A JavaScript compiler for converting codes written in ES6 or JSX to ES5 that is supported by many browsers

## Installation
- Install [NodeJS](http://nodejs.org/en) and [PostgreSQL](https://www.postgresql.org/) on your computer
- Clone this repository
- Navigate to the directoty
- Install all depencies with ```npm install```
- Globally install ```sequelize-cli```
- Using ```sequelize db:migrate``` migrate the database
- Start the server by running ```npm run start:dev```
- Build the application by running ``npm run build:dev``

## Testing
-   Create a test database of your choice by following the example in .env.sample file
-   Run server-side test with `npm test`
-   Run client-side test with `npm run test:client`

## Limitations of the project
- An unregistered user can not add a recipe
- An unregistered user can not modify or delete a recipe
- An unregistered user can not post a review about a recipe
- An unregistered user can not favorite a recipe

## API documentation link
- Access the API documentation at [https://mrecipes.herokuapp.com/documentation](https://mrecipes.herokuapp.com/documentation)

## Contribution
  * Fork the repository
  * Make your contributions
  * Write test cases for your contributions
  * Create Pull request against the **develop** branch.

## FAQ

* What language is used to build this application ?
  - The application (both front-end and back-end) is entirely built with javascript
* Is this an open-source project ?
  - Yes, Is an open-source project.
* Who can contribute ?
  - Anyone can contribute as long as you would follow the contribution guides outlined above
* Is the application hosted online ?
  - Yes, the application is hosted on heroku platform. You can always visit it via this link [https://mrecipes.herokuapp.com/](https://mrecipes.herokuapp.com/)
* Does the application have an API ?
  - Yes, The application has a well documented API that can be viewed via a link in the API documentation section above
* Is the application licensed ? 
  - Yes, the application and its contents is under MIT license
  
## User template is available on
- [MoreRecipes](https://codestaintin.github.io/more_recipes_ui)

## License and Copyright
&copy; Isioye Mohammed

Licensed under the [MIT License](LICENSE).
