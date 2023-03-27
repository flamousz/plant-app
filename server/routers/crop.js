const express = require('express')
const CropController = require('../controllers/CropController')


const cropRouter = express.Router()

cropRouter.get('/', CropController.getCrop)
cropRouter.post('/', CropController.postCrop)
cropRouter.put('/:id', CropController.putCrop)
cropRouter.delete('/:id', CropController.deleteCrop)



module.exports = cropRouter