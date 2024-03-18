const router = require('express').Router()
const oijvois = require('../../reaction-controller');

router.route('/createReaction').post()

router.route('/deletReaction/:id').delete()

module.exports = router