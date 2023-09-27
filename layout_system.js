import {Empty, Exit, Person, Wall, Ball, Dirt, Score, Enemy} from "./game_objects.js";
import {initTwoDementialArray} from "./util.js";


export class BaseLayout {
    constructor(size, completedFunc, loseFunc, addPoints, person) {
        this.completedFunc = completedFunc
        this.loseFunc = loseFunc
        this.addPoints = addPoints
        this.size = size
        this.person = person
        this.person = this.layout = initTwoDementialArray(this.size, 0)
    }

    init() {
        this.objectLayout = initTwoDementialArray(this.size, 0)
        this.person.setFieldSize(this.objectLayout.length)
        this.convertNumNotationToObject()
    }

    getObjectLayout() {
        return this.objectLayout
    }

    convertNumNotationToObject() {
        const cellAssociations = {
            0: Empty,
            1: Wall,
            3: Dirt,
            4: Score,
            5: Enemy,
            7: Ball,
            9: Person,
            8: Exit,
        };
        for (let i = 0; i < this.layout.length; i++) {
            for (let j = 0; j < this.layout.length; j++) {

                if (this.layout[i][j] === 8) {
                    this.objectLayout[i][j] = new Exit(this.completedFunc);
                    continue;
                }

                if (this.layout[i][j] === 7) {
                    this.objectLayout[i][j] = new Ball(this.loseFunc, this.addPoints);
                    continue;
                }

                if(this.layout[i][j] === 4) {
                    this.objectLayout[i][j] = new Score(this.addPoints);
                    continue;
                }

                this.objectLayout[i][j] = new cellAssociations[this.layout[i][j]];

            }
        }
    }
}


export class DefaultLevel extends BaseLayout{
    constructor(_, completedFunc, loseFunc, addPoints, person) {
        super(0, completedFunc, loseFunc, addPoints, person)
        this.layout = [
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 1],
            [1, 3, 3, 4, 3, 3, 3, 7, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 1],
            [1, 9, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 1],
            [1, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 1],
            [1, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 1],
            [1, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 1],
            [1, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 1],
            [1, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3, 3, 3, 1],
            [1, 3, 3, 3, 7, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 1],
            [1, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 1],
            [1, 3, 3, 3, 0, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 1],
            [1, 3, 3, 3, 5, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 1],
            [1, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 1],
            [1, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 1],
            [1, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 1, 7, 3, 3, 3, 3, 3, 1],
            [1, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 1, 1, 3, 3, 3, 3, 3, 1],
            [1, 8, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 1, 1, 1, 3, 3, 3, 3, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        ]
        this.size = this.layout.length
        this.person = person
        this.person.position[0] = 3
        this.person.position[1] = 1
        this.init()
    }
}

export class CustomLayout extends BaseLayout{
    constructor(_, completedFunc, loseFunc, addPoints, person) {
        super(0, completedFunc, loseFunc, addPoints, person)
        this.layout =[[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],[1,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,7,1],[1,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,1],[1,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,1],[1,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,1],[1,3,3,1,1,1,1,1,1,1,3,1,1,1,1,1,1,1,3,3,3,3,3,1],[1,3,3,1,5,0,0,3,3,3,3,3,3,3,3,3,3,1,3,3,3,3,3,1],[1,3,3,1,0,1,1,1,1,1,3,1,1,1,1,1,3,1,3,3,3,3,3,1],[1,3,3,1,0,1,5,0,3,3,3,3,0,0,0,1,3,1,3,3,3,3,3,1],[1,3,3,1,4,1,4,1,1,1,3,1,1,1,0,1,3,1,3,3,3,3,3,1],[1,3,3,1,4,1,4,1,0,0,3,0,0,1,0,1,3,1,3,3,3,3,3,1],[1,3,3,1,4,1,4,1,0,1,3,1,0,1,0,1,5,1,3,3,3,3,3,1],[1,3,3,1,0,1,0,1,0,1,4,1,0,1,0,1,5,1,3,3,3,3,3,1],[1,3,3,1,0,1,0,1,0,1,1,1,0,1,0,1,5,1,3,3,3,3,3,1],[1,3,3,1,0,1,0,1,0,0,0,0,0,1,0,1,5,1,3,3,3,3,3,1],[1,3,3,1,0,1,0,1,1,1,1,1,1,1,5,1,3,1,3,3,3,3,3,1],[1,3,3,1,0,1,5,0,0,0,0,4,4,4,3,1,3,1,3,3,3,3,3,1],[1,3,3,1,0,1,1,1,1,1,1,1,1,1,1,1,3,1,3,3,3,3,3,1],[1,3,3,1,5,3,3,3,3,3,3,3,3,3,4,4,3,1,3,3,3,3,3,1],[1,3,3,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,3,3,3,3,3,1],[1,7,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,1],[1,7,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,1],[1,4,3,7,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,8],[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]]
        this.size = this.layout.length
        this.person = person
        this.person.position[0] = 1
        this.person.position[1] = 15
        this.init()
    }
}