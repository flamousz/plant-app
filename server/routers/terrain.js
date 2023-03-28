const express=require('express')
const TerrainController = require('../controllers/terrainController')
const terrainRouter=express.Router()

terrainRouter.get('/', TerrainController.getTerrain)
terrainRouter.post('/', TerrainController.postTerrain)
terrainRouter.put('/:id', TerrainController.putTerrain)
terrainRouter.delete('/:id', TerrainController.deleteTerrain)



module.exports=terrainRouter