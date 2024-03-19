const router = require('express').Router();
const { getThought, getOneThought, createThought, updateThought, deleteThought } = require('../../controllers/thought-controller');

router.route('/').get(getThought)

router.route('/oneThought/:_id').get(getOneThought)

router.route('/createThought/:username').post(createThought)

router.route('/editThought/:_id').put(updateThought)

router.route('/deleteThought/:_id').delete(deleteThought)

module.exports = router; 