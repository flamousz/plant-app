const express = require('express')
const MaterialController = require('../controllers/materialController')
const materialRouter = express.Router()

materialRouter.get('/', MaterialController.getMaterial)
materialRouter.post('/', MaterialController.postMaterial)
materialRouter.put('/:id', MaterialController.putMaterial)
materialRouter.delete('/:id', MaterialController.deleteMaterial)

module.exports = materialRouter