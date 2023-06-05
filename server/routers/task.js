const express = require('express')
const TaskController = require('../controllers/task')
const taskRouter = express.Router()
const multer = require('multer')
const path = require('path')



const storage = multer.diskStorage({
	destination: (req, file, cb) => {
	  cb(null, 'uploads/'); // Specify the destination folder for storing the files
	},
	filename: (req, file, cb) => {
	  const fileName = Date.now() + path.extname(file.originalname);
	  cb(null, fileName); // Set the file name as per your requirement
	}
  });

// Multer upload middleware using the defined storage configuration
const upload = multer({ storage: storage });


taskRouter.put('/sheet', upload.single('pictureAccident'), TaskController.putTaskSheetVerification)
taskRouter.post('/', TaskController.postTask)
taskRouter.get('/', TaskController.getTask)
taskRouter.get('/sheet', TaskController.getTaskSheet)
taskRouter.post('/sheet', TaskController.postTaskSheet)
taskRouter.get('/:id', TaskController.getTaskById)
taskRouter.put('/:id', TaskController.putTask)
taskRouter.delete('/:id', TaskController.deleteTask)
taskRouter.patch('/:id', TaskController.patchArcStatusTask)

taskRouter.get('/sheet/:id', TaskController.getTaskSheetById)

module.exports = taskRouter