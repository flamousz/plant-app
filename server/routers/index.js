const express = require('express')
const cropRouter = require('./crop')
const cropAreaRouter = require('./cropArea')
const employeeRouter = require('./employee')
const fertilizerRouter = require('./fertilizer')
const materialRouter = require('./material')
const pesticideRouter = require('./pesticide')
const seedRouter = require('./seed')
const taskRouter = require('./task')
const terrainRouter = require('./terrain')
const typeTaskRouter = require('./typeTask')
const router = express.Router()



router.use('/crops', cropRouter)
router.use('/pesticides', pesticideRouter)
router.use('/fertilizers', fertilizerRouter)
router.use('/materials', materialRouter)
router.use('/seeds', seedRouter)
router.use('/employees', employeeRouter)
router.use('/cropareas', cropAreaRouter)
router.use('/tasks', taskRouter)
router.use('/terrains', terrainRouter)
router.use('/typetasks', typeTaskRouter)


module.exports = router