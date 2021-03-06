import { Items, ItemType, GearType } from "../../Enums.ts"
import ItemBase from "./itemBase.ts"

export default class AdamantHelm extends ItemBase {

    constructor(dropChance: number) {
        super(0, Items.AdamantHelm, ItemType.Weareable, GearType.Head, 0, 0, 40, true, 0, 0, 0, dropChance)
    }
}