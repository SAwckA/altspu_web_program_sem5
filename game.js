import {Person} from "./module.js";
import {DefaultLevel} from "./layout_system.js";
import {MazeLayout} from "./mazeLayout.js";


const KEY_CODE_LEFT = 65
const KEY_CODE_UP = 87
const KEY_CODE_RIGHT = 68
const KEY_CODE_DOWN = 83


function getRandomLevel() {
    const LEVELS = [
        DefaultLevel,
        // MazeLayout
    ]

    return LEVELS[Math.floor(Math.random()*LEVELS.length)]
}

export class Game {
    constructor() {
        this.startGame()
        document.addEventListener('keydown', this.addKeyHandler());
    }

    startGame() {
        this.person = new Person([1, 1]);
        this.layout = new (getRandomLevel())(0, this.complete(), this.lose(), this.person)
        this.GameRootElement = null;
        this.HTMLCovertedLayout = null;

        this.initialDraw()
        this.timer = setInterval(this.updateObjects(), 500, this.layout.getObjectLayout())
    }

    initialDraw() {
        let layout = this.layout.getObjectLayout()

        this.GameRootElement = document.getElementById('root')

        let html = '';
        for (let i = 0; i < layout.length; i++) {
            html += `<div class="row">`
            for (let j = 0; j < layout.length; j++) {
                html += `<div class="cell" id="${layout[i][j].cssID}"></div>`
            }
            html += `</div>`
        }

        this.GameRootElement.innerHTML = html;
        this.HTMLCovertedLayout = this.GameRootElement.querySelectorAll('.cell')
    }

    updateDraw() {
        let layout = this.layout.getObjectLayout()

        for (let i = 0; i < this.HTMLCovertedLayout.length; i++) {
            let HTMLObject = this.HTMLCovertedLayout[i]
            let layoutObject = layout[~~(i / layout.length)][i % layout.length]

            if (HTMLObject.id !== layoutObject) {
                HTMLObject.id = layoutObject.cssID
            }

            if (HTMLObject.id === 'person') {
                HTMLObject.scrollIntoView({
                    behavior: 'smooth',
                    block: 'center',
                    inline: 'center'
                })
            }
        }
    }

    addKeyHandler() {
        let game = this
        return (e) => {
            game.handleKey(e)
        }
    }

    handleKey(e) {
        switch (e.keyCode) {
            case KEY_CODE_LEFT:
                this.person.moveLeft(this.layout.getObjectLayout())
                break

            case KEY_CODE_UP:
                this.person.moveUp(this.layout.getObjectLayout())
                break

            case KEY_CODE_RIGHT:
                this.person.moveRight(this.layout.getObjectLayout())
                break

            case KEY_CODE_DOWN:
                this.person.moveDown(this.layout.getObjectLayout())
                break
        }
        this.updateDraw()
    }

    updateObjects() {
        let game = this

        return () => {
            let layout = game.layout.getObjectLayout()
            let lockedObjects = [];

            for (let i = 0; i < layout.length; i++){
                for (let j = 0; j < layout.length; j++) {
                    let obj = layout[i][j]
                    let movable = obj.update(layout, i, j)
                    if (movable) {
                        obj.lockMove()
                        lockedObjects.push(obj)
                    }
                }
            }

            lockedObjects.forEach((e) => {
                e.unlockMove()
            })
            game.updateDraw()
        }
    }

    complete() {
        let game = this
        return () => {
            clearInterval(game.timer)
            game.startGame()

        }
    }

    lose() {
        let game = this
        return () => {
            alert('Вы проиграли')
            clearInterval(game.timer)
            game.startGame()
        }
    }
}