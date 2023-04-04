const express = require("express");
const EmployeeController = require("../controllers/employeeController");
const employeeRouter = express.Router();

employeeRouter.get('/',EmployeeController.getEmployee)
employeeRouter.post('/',EmployeeController.postEmployee)
employeeRouter.delete('/:id',EmployeeController.deleteEmployee)
employeeRouter.get('/:id', EmployeeController.getEmployeeById)
employeeRouter.put('/:id', EmployeeController.putEmployee)



module.exports = employeeRouter;
