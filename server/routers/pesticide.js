const express = require('express')
const PesticideController = require('../controllers/pesticideController')
const pesticideRouter = express.Router()

pesticideRouter.get('/', PesticideController.getPesticide)
pesticideRouter.post('/', PesticideController.postPesticide)
pesticideRouter.put('/:id', PesticideController.putPesticide)
pesticideRouter.delete('/:id', PesticideController.deletePesticide)


module.exports = pesticideRouter

