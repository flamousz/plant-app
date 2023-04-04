const express=require('express')
const CropAreaController = require('../controllers/cropArea')
const cropAreRouter=express.Router()

cropAreRouter.get('/', CropAreaController.getCropArea)
cropAreRouter.post('/', CropAreaController.postCropArea)
cropAreRouter.get('/:id', CropAreaController.getCropAreaById)
cropAreRouter.put('/:id', CropAreaController.putCropArea)
cropAreRouter.delete('/:id', CropAreaController.deleteCropArea)

module.exports=cropAreRouter