const router = require('express').Router();
const { getUser, getOneUser, createUser, updateUser, deleteUser, addFriend, deleteFriend } = require('../../controllers/user-controller');

router.route('/').get(getUser)

router.route('/oneUser/:username').get(getOneUser)

router.route('/createUser').post(createUser)

router.route('/editUser/:username').put(updateUser)

router.route('/deleteUser/:username').delete(deleteUser)

router.route('/addFriend/:friendUser').post(addFriend)

router.route('/deleteFriend/:friendUser').delete(deleteFriend)

module.exports = router; 