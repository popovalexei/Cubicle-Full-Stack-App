const router = require('express').Router();
const userService = require('./../services/userService.js');
const { extractErrorMsgs } = require('../utils/errorHandle.js');

//!Register
router.get('/register', (req, res) => {
  res.render('user/register');
});

router.post('/register', async (req, res) => {
  const { username, password, repeatPassword } = req.body;

  try {
    await userService.register({ username, password, repeatPassword });
    res.redirect('/users/login');
  } catch (error) {
    const { message } = error;
    const errorMessages = extractErrorMsgs(error);
    res.status(404).render('user/register', { errorMessages });
  }
});

//!Login
router.get('/login', (req, res) => {
  res.render('user/login');
});

router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  const token = await userService.login(username, password);

  res.cookie('auth', token, { httpOnly: true });

  res.redirect('/');
});

//!Logout
router.get('/logout', (req, res) => {
  res.clearCookie('auth');
  res.redirect('/');
});

module.exports = router;
