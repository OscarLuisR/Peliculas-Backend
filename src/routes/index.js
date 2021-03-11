const  routes = require('express').Router();

routes.use('/api/auth', require('./auth.routes'));
routes.use('/api/peliculas', require('./peliculas.routes'));

module.exports = routes;