const express=require('express')
const CropAreaController = require('../controllers/cropAreaController')
const cropAreaRouter=express.Router()

cropAreaRouter.get('/', CropAreaController.getCropArea)
cropAreaRouter.post('/', CropAreaController.postCropArea)
cropAreaRouter.put('/:id', CropAreaController.putCropArea)
cropAreaRouter.delete('/:id', CropAreaController.deleteCropArea)


module.exports=cropAreaRouter