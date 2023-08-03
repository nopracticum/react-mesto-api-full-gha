const router = require('express').Router();
const rateLimit = require('express-rate-limit');

const userRouter = require('./user');
const cardsRouter = require('./card');
const auth = require('../middlewares/auth');
const { createUser, login } = require('../controllers/user');
const { registerValidation, loginValidation } = require('../middlewares/validation');
const NotFoundError = require('../errors/NotFoundError');

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  legacyHeaders: false,
  message: 'Слишком много запросов, пожалуйста попробуйте позже',
});

router.post('/signin', authLimiter, loginValidation, login);
router.post('/signup', authLimiter, registerValidation, createUser);

router.use(auth);

router.use('/cards', cardsRouter);
router.use('/users', userRouter);

router.use('*', (req, res, next) => {
  next(new NotFoundError('Страница не найдена'));
});

module.exports = router;
