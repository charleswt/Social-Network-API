const router = require('express').Router();
const reaction = require('./reaction-api')
const thought = require('./thought-api')
const user = require('./user-api')

router.use('reaction', reaction);
router.use('thought', thought);
router.use('user', user)

module.exports = router;