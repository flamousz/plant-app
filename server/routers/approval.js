const express = require('express')
const ApprovalController = require('../controllers/approval')
const approvalRouter = express.Router()

approvalRouter.post('/', ApprovalController.getAllApproval)

module.exports = approvalRouter