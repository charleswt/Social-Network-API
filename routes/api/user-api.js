const router = require('express').Router();
const { getUser, createUser, updateUser, deleteUser } = require('../../controllers/user-controller');

router.route('/').get(getUser)

router.route('/createUser').post(createUser)

router.route('/editUser').put(updateUser)

router.route('/deleteUser').delete(deleteUser)

module.exports = router; 