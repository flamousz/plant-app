const express = require('express')
const TaskController = require('../controllers/task')
const taskRouter = express.Router()

taskRouter.post('/', TaskController.postTask)
taskRouter.get('/', TaskController.getTask)
taskRouter.get('/sheet', TaskController.getTaskSheet)
taskRouter.get('/:id', TaskController.getTaskById)
taskRouter.put('/:id', TaskController.putTask)
taskRouter.delete('/:id', TaskController.deleteTask)
taskRouter.patch('/:id', TaskController.patchArcStatusTask)

module.exports = taskRouter