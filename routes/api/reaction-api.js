const router = require('express').Router()
const { createReaction, deleteReaction } = require('../../controllers/reaction-controller');

router.route('/createReaction').post(createReaction)

router.route('/deletReaction/:thoughtId/:reactionId').delete(deleteReaction)

module.exports = router