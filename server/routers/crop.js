const express = require('express')
const CropController = require('../controllers/CropController')


const cropRouter = express.Router()

cropRouter.get('/', CropController.getCrop)



module.exports = cropRouter