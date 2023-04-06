const express = require('express')
const ItemController = require('../controllers/item')
const itemRouter=express.Router()

itemRouter.get('/', ItemController.getItem)
itemRouter.get('/plants', ItemController.getItemPlant)
itemRouter.get('/materials', ItemController.getItemMaterial)
itemRouter.get('/fertilizers', ItemController.getItemFertilizers)
itemRouter.get('/seeds', ItemController.getItemSeeds)
itemRouter.get('/pesticides', ItemController.getItemPesticides)
itemRouter.get('/plant', ItemController.getItemPlant)
itemRouter.get('/plant', ItemController.getItemPlant)
itemRouter.post('/', ItemController.postItem)
itemRouter.get('/:id', ItemController.getItemById)
itemRouter.put('/:id', ItemController.putItem)
itemRouter.delete('/:id', ItemController.deleteItem)

module.exports=itemRouter