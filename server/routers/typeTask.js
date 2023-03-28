const express=require('express')
const TypeTaskController = require('../controllers/typeTaskController')
const typeTaskRouter=express.Router()

typeTaskRouter.get('/', TypeTaskController.getTypeTask)
typeTaskRouter.post('/', TypeTaskController.postTypeTask)
typeTaskRouter.put('/:id', TypeTaskController.putTypeTask)
typeTaskRouter.delete('/:id', TypeTaskController.deleteTypeTask)


module.exports=typeTaskRouter
