const express = require('express')
const FertilizerController = require('../controllers/fertilizerController')
const fertilizerRouter = express.Router()

fertilizerRouter.get('/', FertilizerController.getFertilizer)
fertilizerRouter.post('/', FertilizerController.postFertilizer)
fertilizerRouter.put('/:id', FertilizerController.putFertilizer)
fertilizerRouter.delete('/:id', FertilizerController.deleteFertilizer)

module.exports = fertilizerRouter
