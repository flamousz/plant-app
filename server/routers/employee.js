const express = require('express')
const EmployeeController = require('../controllers/employeeController')
const employeeRouter = express.Router()

employeeRouter.get('/', EmployeeController.getEmployee)
employeeRouter.post('/', EmployeeController.postEmployee)
employeeRouter.put('/:id', EmployeeController.putEmployee)
employeeRouter.delete('/:id', EmployeeController.deleteEmployee)

module.exports = employeeRouter