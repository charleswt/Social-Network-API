const router = require('express').Router();
const { getThought, createThought, updateThought, deleteThought } = require('../../controllers/thought-controller');

router.route('/').get(getThought)

router.route('/createThought').post(createThought)

router.route('/editThought').put(updateThought)

router.route('/deleteThought').delete(deleteThought)

module.exports = router; 