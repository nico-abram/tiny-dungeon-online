import Room from './room.ts'
import { Rooms } from '../../Enums.ts'
import Exits from "./exits.ts"
import { ClientHandler } from '../../clientHandler.ts'
import { SolidLayers } from "../../../shared/solidLayers.ts"
import Spider from "../../entities/npcs/spider.ts"
import ImpArcher from "../../entities/npcs/impArcher.ts"
import Bee from "../../entities/npcs/bee.ts"

export default class Woods8 extends Room{
  constructor(id: number, clientHandler: ClientHandler) {
    super (id, new Exits(-1, Rooms.DeepLake, Rooms.Woods7, Rooms.River14), clientHandler)
    this.solidLayer = SolidLayers.Woods8
    this.npcSpawns = this.buildNpcSpawns()
    this.spawnNpcs()
  }

  private buildNpcSpawns(): any {
    return [[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,new Spider(),0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,new Bee(),0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,new ImpArcher(),0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,new Spider(),0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,new ImpArcher(),0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]]
  }
}