const express = require('express')
const SeedController = require('../controllers/seedController')
const seedRouter = express.Router()

seedRouter.get('/', SeedController.getSeed)
seedRouter.post('/', SeedController.postSeed)
seedRouter.put('/:id', SeedController.putSeed)
seedRouter.delete('/:id', SeedController.deleteSeed)

module.exports = seedRouter