const express = require('express')
const cropRouter = require('./crop')
const fertilizerRouter = require('./fertilizer')
const materialRouter = require('./material')
const pesticideRouter = require('./pesticide')
const router = express.Router()



router.use('/crops', cropRouter)
router.use('/pesticides', pesticideRouter)
router.use('/fertilizers', fertilizerRouter)
router.use('/materials', materialRouter)


module.exports = router