// TODO: Рефактор всего файла (Оптимизировать условия)


const DEFAULT_SCORE_POINTS = 100


export class Cell {
    cssID = 'not__implemented'
    constructor() {
        this.loseFunc = () => {}
    }

    update(layout, posI, posJ) {
        return false
    }
}

export class Exit extends Cell {
    cssID = 'exit'
    constructor(func) {
        super()
        this.func = func
    }
    enter() {
        this.func()
    }
}

export class Empty extends Cell{
    cssID = 'empty'
}

export class Wall extends Cell{
    cssID = 'wall'
}

export class Person extends Cell{
    cssID = 'person'

    constructor(startPosition, loseFunc) {
        super('')
        this.loseFunc = loseFunc
        this.position = startPosition
    }

    setFieldSize(size) {
        this.fieldSize = size
    }

    moveLeft(layout){
        if (this.position[1] === 0) {return}
        let nextCell = layout[this.position[0]][this.position[1]-1]

        if (nextCell.constructor === Ball) {
            if(layout[this.position[0]][this.position[1]-2].constructor === Wall) {
                return;
            }
            layout[this.position[0]][this.position[1]] = new Empty()
            this.position[1] -= 1
            layout[this.position[0]][this.position[1]] = this
            layout[this.position[0]][this.position[1]-1] = nextCell
            return
        }
        if (nextCell.constructor === Wall) {return}
        if (nextCell.constructor === Enemy) {return}
        if (nextCell.constructor === Butterfly) {return}
        if (nextCell.constructor === Exit) {
            nextCell.enter()
        }
        if (nextCell.constructor === Score) {
            nextCell.reach()
        }

        layout[this.position[0]][this.position[1]] = new Empty()
        this.position[1] -= 1
        layout[this.position[0]][this.position[1]] = this

    }
    moveUp(layout){
        if (this.position[0] === 0) {return}
        let nextCell = layout[this.position[0]-1][this.position[1]]

        if (nextCell.constructor === Ball) {return}
        if (nextCell.constructor === Wall) {return}
        if (nextCell.constructor === Enemy) {return}
        if (nextCell.constructor === Butterfly) {return}
        if (nextCell.constructor === Exit) {
            nextCell.enter()
        }
        if (nextCell.constructor === Score) {
            nextCell.reach()
        }

        layout[this.position[0]][this.position[1]] = new Empty()
        this.position[0] -= 1
        layout[this.position[0]][this.position[1]] = this

    }
    moveRight(layout){
        if (this.position[1] === this.fieldSize-1) {return}
        let nextCell = layout[this.position[0]][this.position[1]+1]

        if (nextCell.constructor === Ball) {
            if(layout[this.position[0]][this.position[1]+2].constructor === Wall) {
                return;
            }
            layout[this.position[0]][this.position[1]] = new Empty()
            this.position[1] += 1
            layout[this.position[0]][this.position[1]] = this
            layout[this.position[0]][this.position[1]+1] = nextCell
            return
        }
        if (nextCell.constructor === Wall) {return}
        if (nextCell.constructor === Enemy) {return}
        if (nextCell.constructor === Butterfly) {return}
        if (nextCell.constructor === Exit) {
            nextCell.enter()
        }
        if (nextCell.constructor === Score) {
            nextCell.reach()
        }

        layout[this.position[0]][this.position[1]] = new Empty()
        this.position[1] += 1
        layout[this.position[0]][this.position[1]] = this

    }
    moveDown(layout){
        if (this.position[0] === this.fieldSize-1) {return}
        let nextCell = layout[this.position[0]+1][this.position[1]]

        if (nextCell.constructor === Ball) {return}
        if (nextCell.constructor === Wall) {return}
        if (nextCell.constructor === Enemy) {return}
        if (nextCell.constructor === Butterfly) {return}
        if (nextCell.constructor === Exit) {
            nextCell.enter()
        }
        if (nextCell.constructor === Score) {
            nextCell.reach()
        }

        layout[this.position[0]][this.position[1]] = new Empty()
        this.position[0] += 1    
        layout[this.position[0]][this.position[1]] = this
    }
}

export class Dirt extends Cell {
    cssID = 'dirt'
}

export class Ball extends Cell {
    cssID = 'ball'

    constructor(loseFunc, killRewardFunc) {
        super();
        this.loseFunc = loseFunc
        this.direction = ''
        this.killRewardFunc = killRewardFunc
    }

    lockMove() {
        this.locked = true
        return true
    }
    unlockMove() {
        this.locked = false
        return true
    }

    update(layout, posI, posJ) {
        if (this.locked) { return true }

        if (layout[posI + 1][posJ].constructor === Empty) {
            layout[posI + 1][posJ] = this
            layout[posI][posJ] = new Empty()
            return true

        } else if (layout[posI + 1][posJ].constructor === Person) {
            this.loseFunc()
        } else if (layout[posI + 1][posJ].constructor === Enemy
            || layout[posI + 1][posJ].constructor === Butterfly) {
            layout[posI + 1][posJ].kill(layout, posI+1, posJ, this.killRewardFunc)
        }

        if (layout[posI][posJ - 1].constructor === Empty && (layout[posI+1][posJ - 1].constructor === Empty)) {
            layout[posI][posJ - 1] = this
            layout[posI][posJ] = new Empty()

        } else if (layout[posI][posJ + 1].constructor === Empty && layout[posI+1][posJ + 1].constructor === Empty) {
            layout[posI][posJ + 1] = this
            layout[posI][posJ] = new Empty()

        }
        this.lockMove()
        return true
    }
}

export class Score extends Ball {
    cssID = 'score'

    constructor(onReaching, amountPoints = DEFAULT_SCORE_POINTS) {
        super();
        this.loseFunc = () => {}
        this.onReaching = onReaching;
        this.amountPoints = amountPoints;
    }

    reach() {
        this.onReaching(this.amountPoints)
    }

}


export class Enemy extends Ball {
    cssID = 'enemy'

    kill(layout, posI, posJ, killRewardFunc) {
        layout[posI][posJ] = new Empty()
        delete this
        console.log(`killed: ${this}`)

        let spawnScore = [
            [0, 1],
            [0, -1],
            [1, 0],
            [-1, 0],
            [1, 1],
            [-1, 1],
            [1, -1],
            [-1, -1],
        ]

        spawnScore.forEach((cords) => {
            if (layout[posI+cords[0]][posJ+cords[1]].constructor === Empty) {
                layout[posI+cords[0]][posJ+cords[1]] = new Score(killRewardFunc)
            }
        })

    }

    update(layout, posI, posJ) {
        if (this.locked) { return true }

            switch (this.direction) {
                case 'right':
                    if (layout[posI-1][posJ].constructor === Empty || layout[posI-1][posJ].constructor === Person) {
                        layout[posI-1][posJ].loseFunc()
                        layout[posI-1][posJ] = this
                        layout[posI][posJ] = new Empty()
                        this.direction = 'up'
                        return true
                    }
                    if (layout[posI][posJ+1].constructor === Empty || layout[posI][posJ+1].constructor === Person) {
                        layout[posI][posJ+1].loseFunc()
                        layout[posI][posJ+1] = this
                        layout[posI][posJ] = new Empty()
                        this.direction = 'right'
                        return true
                    }
                    if (layout[posI+1][posJ].constructor === Empty || layout[posI+1][posJ].constructor === Person){
                        layout[posI+1][posJ].loseFunc()
                        layout[posI+1][posJ] = this
                        layout[posI][posJ] = new Empty()
                        this.direction = 'down'
                        return true
                    }
                    if (layout[posI][posJ-1].constructor === Empty || layout[posI][posJ-1].constructor === Person) {
                        layout[posI][posJ-1].loseFunc()
                        layout[posI][posJ-1] = this
                        layout[posI][posJ] = new Empty()
                        this.direction = 'left'
                        return true
                    }
                    break;

                case 'left':
                    if (layout[posI+1][posJ].constructor === Empty || layout[posI+1][posJ].constructor === Person) {
                        layout[posI+1][posJ].loseFunc()
                        layout[posI+1][posJ] = this
                        layout[posI][posJ] = new Empty()
                        this.direction = 'down'
                        return true
                    }
                    if (layout[posI][posJ-1].constructor === Empty || layout[posI][posJ-1].constructor === Person) {
                        layout[posI][posJ-1].loseFunc()
                        layout[posI][posJ-1] = this
                        layout[posI][posJ] = new Empty()
                        this.direction = 'left'
                        return true
                    }
                    if (layout[posI-1][posJ].constructor === Empty || layout[posI-1][posJ].constructor === Person) {
                        layout[posI-1][posJ].loseFunc()
                        layout[posI-1][posJ] = this
                        layout[posI][posJ] = new Empty()
                        this.direction = 'up'
                        return true
                    }
                    if (layout[posI][posJ+1].constructor === Empty || layout[posI][posJ+1].constructor === Person) {
                        layout[posI][posJ+1].loseFunc()
                        layout[posI][posJ+1] = this
                        layout[posI][posJ] = new Empty()
                        this.direction = 'right'
                        return true
                    }
                    break;

                case 'up':
                    if (layout[posI][posJ-1].constructor === Empty || layout[posI][posJ-1].constructor === Person) {
                        layout[posI][posJ-1].loseFunc()
                        layout[posI][posJ-1] = this
                        layout[posI][posJ] = new Empty()
                        this.direction = 'left'
                        return true
                    }
                    if (layout[posI-1][posJ].constructor === Empty || layout[posI-1][posJ].constructor === Person) {
                        layout[posI-1][posJ].loseFunc()
                        layout[posI-1][posJ] = this
                        layout[posI][posJ] = new Empty()
                        this.direction = 'up'
                        return true
                    }
                    if (layout[posI][posJ+1].constructor === Empty || layout[posI][posJ+1].constructor === Person) {
                        layout[posI][posJ+1].loseFunc()
                        layout[posI][posJ+1] = this
                        layout[posI][posJ] = new Empty()
                        this.direction = 'right'
                        return true
                    }
                    if (layout[posI+1][posJ].constructor === Empty || layout[posI+1][posJ].constructor === Person) {
                        layout[posI+1][posJ].loseFunc()
                        layout[posI+1][posJ] = this
                        layout[posI][posJ] = new Empty()
                        this.direction = 'down'
                        return true
                    }
                    break;

                case 'down':
                    if (layout[posI][posJ+1].constructor === Empty || layout[posI][posJ+1].constructor === Person) {
                        layout[posI][posJ+1].loseFunc()
                        layout[posI][posJ+1] = this
                        layout[posI][posJ] = new Empty()
                        this.direction = 'right'
                        return true
                    }
                    if (layout[posI+1][posJ].constructor === Empty || layout[posI+1][posJ].constructor === Person) {
                        layout[posI+1][posJ].loseFunc()
                        layout[posI+1][posJ] = this
                        layout[posI][posJ] = new Empty()
                        this.direction = 'down'
                        return true
                    }
                    if (layout[posI][posJ-1].constructor === Empty || layout[posI][posJ-1].constructor === Person) {
                        layout[posI][posJ-1].loseFunc()
                        layout[posI][posJ-1] = this
                        layout[posI][posJ] = new Empty()
                        this.direction = 'left'
                        return true
                    }
                    if (layout[posI-1][posJ].constructor === Empty || layout[posI-1][posJ].constructor === Person) {
                        layout[posI-1][posJ].loseFunc()
                        layout[posI-1][posJ] = this
                        layout[posI][posJ] = new Empty()
                        this.direction = 'up'
                        return true
                    }
                    break;

                default:
                    this.direction = 'left'
            }


            return true

    }
}

export class Butterfly extends Enemy {
    cssID = 'butterfly'
}