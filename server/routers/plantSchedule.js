const express = require('express')
const PlantScheduleController = require('../controllers/plantSchedule')
const plantScheduleRouter = express.Router()

plantScheduleRouter.get('/', PlantScheduleController.getSchedule)

module.exports = plantScheduleRouter