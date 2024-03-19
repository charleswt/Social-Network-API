const router = require('express').Router()
const { createReaction, deleteReaction } = require('../../controllers/reaction-controller');

router.route('/createReaction/:username').post(createReaction)

router.route('/deleteReaction/:thoughtId/:reactionId').delete(deleteReaction)

module.exports = router