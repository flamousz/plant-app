const express = require("express");
const { authentication } = require("../middlewares/auth");
const userRouter = require("./user");
const employeeRouter = require("./employee");
const cropAreRouter = require("./cropArea");
const categoryRouter = require("./category");
const uomRouter = require("./uom");
const plantTypeRouter = require("./plantType");
const router = express.Router();

router.use("/", userRouter);
// router.use(authentication)
router.use('/employees', employeeRouter)
router.use('/cropareas', cropAreRouter)
router.use('/categories', categoryRouter)
router.use('/uoms', uomRouter)
router.use('/planttypes', plantTypeRouter)



module.exports = router;
