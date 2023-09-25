export class Cell {
    cssID = 'not__implemented'
    constructor() {
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

    constructor(startPosition) {
        super('')
        this.position = startPosition
    }

    setFieldSize(size) {
        this.fieldSize = size
    }

    moveLeft(layout){
        if (this.position[1] === 0) {return}
        let nextCell = layout[this.position[0]][this.position[1]-1]

        if (nextCell.constructor === Ball) {return}
        if (nextCell.constructor === Wall) {return}
        if (nextCell.constructor === Exit) {
            nextCell.enter()
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
        if (nextCell.constructor === Exit) {
            nextCell.enter()
        }

        layout[this.position[0]][this.position[1]] = new Empty()
        this.position[0] -= 1
        layout[this.position[0]][this.position[1]] = this

    }
    moveRight(layout){
        if (this.position[1] === this.fieldSize-1) {return}
        let nextCell = layout[this.position[0]][this.position[1]+1]

        if (nextCell.constructor === Ball) {return}
        if (nextCell.constructor === Wall) {return}
        if (nextCell.constructor === Exit) {
            nextCell.enter()
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
        if (nextCell.constructor === Exit) {
            nextCell.enter()
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

    constructor(loseFunc) {
        super();
        this.loseFunc = loseFunc
        this.direction = ''
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
            this.direction = 'down'
            return true
        } else if (layout[posI + 1][posJ].constructor === Person) {
            this.loseFunc()
        }

        if (layout[posI][posJ - 1].constructor === Empty && this.direction !== 'right') {
            layout[posI][posJ - 1] = this
            layout[posI][posJ] = new Empty()
            this.direction = 'left'
        } else if (layout[posI][posJ + 1].constructor === Empty) {
            if (this.direction === 'left') { return; }
            layout[posI][posJ + 1] = this
            layout[posI][posJ] = new Empty()
            this.direction = 'right'
        }
        return true
    }
}