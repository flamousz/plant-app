const express=require('express')
const TaskController = require('../controllers/taskController')
const taskRouter=express.Router()

taskRouter.get('/', TaskController.getTask)

module.exports=taskRouter