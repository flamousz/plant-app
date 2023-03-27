const express = require('express')
const cropRouter = require('./crop')
const router = express.Router()



router.use('/crops', cropRouter)


module.exports = router