const express = require("express");
const EmployeeController = require("../controllers/employeeController");
const employeeRouter = express.Router();

employeeRouter.get('/',EmployeeController.getEmployee)
employeeRouter.get('/task',EmployeeController.getEmployeeAtTaskSheet)
employeeRouter.post('/',EmployeeController.postEmployee)
employeeRouter.delete('/:id',EmployeeController.deleteEmployee)
employeeRouter.get('/:id', EmployeeController.getEmployeeById)
employeeRouter.put('/:id', EmployeeController.putEmployee)
employeeRouter.patch('/:id', EmployeeController.patchArcStatusEmployee)



module.exports = employeeRouter;
