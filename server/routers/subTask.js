const express=require('express')
const SubTaskController = require('../controllers/subTask')
const subTaskRouter=express.Router()

subTaskRouter.get('/', SubTaskController.getSubTask)
subTaskRouter.post('/', SubTaskController.postSubTask)
subTaskRouter.put('/:id', SubTaskController.putSubTask)
subTaskRouter.delete('/:id', SubTaskController.deleteSubTask)

module.exports=subTaskRouter
