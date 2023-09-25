export class Cell {
    cssID = 'not__implemented'
    constructor(sprite) {
        this.sprite = sprite    
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
        if (this.position[1] == 0) {return}
        let nextCell = layout[this.position[0]][this.position[1]-1]
        
        if (nextCell.constructor == Wall) {return}
        if (nextCell.constructor == Exit) {
            nextCell.enter()
        }

        layout[this.position[0]][this.position[1]] = new Empty()
        this.position[1] -= 1
        layout[this.position[0]][this.position[1]] = this

    }
    moveUp(layout){
        if (this.position[0] == 0) {return}
        let nextCell = layout[this.position[0]-1][this.position[1]]

        if (nextCell.constructor == Wall) {return}
        if (nextCell.constructor == Exit) {
            nextCell.enter()
        }

        layout[this.position[0]][this.position[1]] = new Empty()
        this.position[0] -= 1
        layout[this.position[0]][this.position[1]] = this

    }
    moveRight(layout){
        if (this.position[1] == this.fieldSize-1) {return}
        let nextCell = layout[this.position[0]][this.position[1]+1]
        
        if (nextCell.constructor == Wall) {return}
        if (nextCell.constructor == Exit) {
            nextCell.enter()
        }

        layout[this.position[0]][this.position[1]] = new Empty()
        this.position[1] += 1
        layout[this.position[0]][this.position[1]] = this

    }
    moveDown(layout){
        if (this.position[0] == this.fieldSize-1) {return}
        let nextCell = layout[this.position[0]+1][this.position[1]]

        if (nextCell.constructor == Wall) {return}
        if (nextCell.constructor == Exit) {
            nextCell.enter()
        }

        layout[this.position[0]][this.position[1]] = new Empty()
        this.position[0] += 1    
        layout[this.position[0]][this.position[1]] = this
    }
}