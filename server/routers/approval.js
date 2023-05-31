const express = require('express')
const ApprovalController = require('../controllers/approval')
const approvalRouter = express.Router()

approvalRouter.post('/', ApprovalController.getAllApproval)
approvalRouter.get('/master', ApprovalController.getAllApprovalMaster)
approvalRouter.get('/', ApprovalController.getAllRejectedApproval)

module.exports = approvalRouter