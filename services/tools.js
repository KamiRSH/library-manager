import { randomInt } from "node:crypto"

export class Tools{
    constructor() {
        if (Tools.instance){
            return Tools.instance
        }
        Tools.instance = this
    }

    generate16digits(){
        const part1 = randomInt(10 ** 7, 10 ** 8 - 1)
        const part2 = randomInt(10 ** 7, 10 ** 8 - 1)
        return Number(part1.toString() + part2.toString())
    }
}