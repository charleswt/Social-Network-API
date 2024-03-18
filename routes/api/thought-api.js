const router = require('express').Router();
const { getThought, getOneThought, createThought, updateThought, deleteThought } = require('../../controllers/thought-controller');

router.route('/').get(getThought)

router.route('/oneThought').get(getOneThought)

router.route('/createThought').post(createThought)

router.route('/editThought').put(updateThought)

router.route('/deleteThought').delete(deleteThought)

module.exports = router; 