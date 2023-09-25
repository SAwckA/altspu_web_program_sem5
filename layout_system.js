// TODO: Страница с созданием карты (0 и 1 расставлять это ужас, но пока так)

import {Empty, Exit, Person, Wall, Ball, Dirt} from "./module.js";
import {initTwoDementialArray} from "./util.js";


export class BaseLayout {
    constructor(size, completedFunc, loseFunc, person) {
        this.completedFunc = completedFunc
        this.loseFunc = loseFunc
        this.size = size
        this.person = person
        this.layout = initTwoDementialArray(this.size, 0)
    }

    init() {
        this.objectLayout = initTwoDementialArray(this.size, 0)
        this.person.setFieldSize(this.objectLayout.length)
        this.convertNumNotationToObject()
        console.log(this)
    }

    getObjectLayout() {
        return this.objectLayout
    }

    convertNumNotationToObject() {
        const cellAssociations = {
            0: Empty,
            1: Wall,
            3: Dirt,
            7: Ball,
            9: Person,
            8: Exit,
        };
        for (let i = 0; i < this.layout.length; i++) {
            for (let j = 0; j < this.layout.length; j++) {

                if (this.layout[i][j] === 8) {
                    this.objectLayout[i][j] = new Exit(this.completedFunc)
                    continue
                }
                if (this.layout[i][j] === 7) {
                    this.objectLayout[i][j] = new Ball(this.loseFunc)
                    continue
                }

                this.objectLayout[i][j] = new cellAssociations[this.layout[i][j]]

            }
        }
    }
}


export class DefaultLevel extends BaseLayout{
    constructor(_, completedFunc, loseFunc, person) {
        super(0, completedFunc, loseFunc, person)
        this.layout = [
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 1],
            [1, 3, 3, 3, 3, 3, 3, 7, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 1],
            [1, 9, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 1],
            [1, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 1],
            [1, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 1],
            [1, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 1],
            [1, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 1],
            [1, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3, 3, 3, 1],
            [1, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 1],
            [1, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 1],
            [1, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 1],
            [1, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 1],
            [1, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 1],
            [1, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 1],
            [1, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 1, 7, 3, 3, 3, 3, 3, 1],
            [1, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 1, 1, 3, 3, 3, 3, 3, 1],
            [1, 8, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 1, 1, 1, 3, 3, 3, 3, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        ]
        this.size = this.layout.length
        this.person.position[0] = 3
        this.person.position[1] = 1
        this.init()
    }
}