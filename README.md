# Felix Website

> A good starting point for a single page app style band website

__AND__

> The official website for the epic band Felix and Friends

*Felix Website* is not only the source code for [the official Felix & Friends band website](https://felixandfriends.net) but it's also a great starting point for building out any band website. It's a single page app style website built in React, backed by Express, and built with Webpack. It includes a React front-end for users and a React admin panel for editing blog posts, entering discography, etc. The backend is powered by Express and it's simple to set up and deploy. I made this in a such a way that it should be easy to edit to suit your needs and expand on without having to rip it apart. That said, if you don't like the base site you should probably just find some generic framework and build a site from scratch. 

## Installation and Setup

__Requirements__

- Node v7.5.0 or higher

__Setup__

1. Clone the project
2. Install Webpack and Knex globally with `npm install -g webpack knex`
3. Install dependencies with `npm install` or `yarn`
4. Run the database migrations: `cd server && knex migrate:latest`

__Run the app__

`npm run dev` will start a front-end Webpack dev server and a backend Express server monitored by Nodemon. The server watches for code changes on both ends and reloads the app as needed. Only stylesheet changes require you to hit the reload button.

__Database seeds__

`cd` into `./server` and run `knex seed:run`

## Deployment

This site was built with PM2 in mind. If you want to deploy to Heroku or something I'm sure that'll work but deployment is really up to you. There is/will be some deployment script examples to get your started deploying to your own server but this part is up to you.

## Customizing the site

These are the different places you'll want to look to customize everything about the site.

### Styling and layout

All styles are in `client/less`. The files you're looking for are `style.less` and `admin.less`. If you're familiar with LESS and CSS you'll know what to do from here. There's a Bootstrap-style grid available in `client/less/modules/grid.less` (see [Fraction.less boilerplate](http://fractionless.info)) but by default the site is using the new CSS Grid so you won't find as many layout classes in the markup as usual.

### Configuration and Settings

Things should run fine in development without any changes but you'll need to configure the site for production yourself. These are the files you'll want to mess with to configure the backend and front-end:

__`package.json`__ - For the love of god please don't use the exact same package.json as me. Just update the project name. It's not hard.

__`webpack.config.js`__ - There's an API_URL variable defined by `webpack.DefinePlugin()` in the plugins section of the Webpack config. You'll want to change this to your site's domain by updating the `apiUrl` found towards the top of this file.

__`server/config/app.js`__ - The configuration for the Express server is stored here. You'll want to update the CORS section to accept requests from your site's domain and a few other things. Make sure to look over this file so the site runs how you expect in production.

__`server/knexfile.js`__ - This file is ignored by default by git. Don't unignore it. Just put your production settings in it.

### Databases, Migrations, Seeds

This project uses Bookshelf which is built on top of Knex. Check out the Knex docs on migrations and seeding for details on how to create/run migrations and seeds. There are already seed files in `server/db/seeds/<environment>/`. You can use those as a starting point for seeding your dev, staging, and production databases.


## Contributing

If you want to contribute open up an issue then make a pull request against the `develop` branch. Remember, this is a fairly generic site so keep your contributions generic.
