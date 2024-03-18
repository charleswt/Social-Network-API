const router = require('express').Router();
const jvknsv = require('../../thought-controller');

router.route('/').get()

router.route('/createThought').post()

router.route('/editThought/:id').put()

router.route('/deleteThought/:id').delete()

module.exports = router; 