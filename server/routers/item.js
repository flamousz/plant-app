const express = require('express')
const ItemController = require('../controllers/item')
const itemRouter=express.Router()

itemRouter.get('/', ItemController.getItem)
itemRouter.post('/', ItemController.postItem)
itemRouter.get('/:id', ItemController.getItemById)
itemRouter.put('/:id', ItemController.putItem)
itemRouter.delete('/:id', ItemController.deleteItem)

module.exports=itemRouter