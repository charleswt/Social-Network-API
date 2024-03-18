const router = require('express').Router();
const jvknsv = require('../../user-controller');

router.route('/').get()

router.route('/createUser').post()

router.route('/editUser/:id').put()

router.route('/deleteUser/:id').delete()

module.exports = router; 