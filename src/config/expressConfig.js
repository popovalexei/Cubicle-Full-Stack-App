const express = require('express');
const path = require('path');
const cookieParse = require('cookie-parser');
const { auth } = require('../middlewares/authMiddleware.js');

const expressConfig = (app) => {
  app.use(express.static(path.resolve(__dirname, '../public')));
  // middleware that allows us to access the info from FORMS
  app.use(express.urlencoded({ extended: false }));
  app.use(cookieParse());
  app.use(auth);
};

module.exports = expressConfig;
