const router = require('express').Router();
const { getUser, getOneUser, createUser, updateUser, deleteUser } = require('../../controllers/user-controller');

router.route('/').get(getUser)

router.route('/oneUser/:username').get(getOneUser)

router.route('/createUser').post(createUser)

router.route('/editUser/:username').put(updateUser)

router.route('/deleteUser/:username').delete(deleteUser)

module.exports = router; 