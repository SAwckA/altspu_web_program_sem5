import {Person} from "./game_objects.js";
import {CustomLayout, DefaultLevel} from "./layout_system.js";
import {MazeLayout} from "./mazeLayout.js";


const KEY_CODE_LEFT = 65
const KEY_CODE_UP = 87
const KEY_CODE_RIGHT = 68
const KEY_CODE_DOWN = 83


function getRandomLevel() {
    const LEVELS = [
        // DefaultLevel,
        // MazeLayout
        CustomLayout
    ]

    return LEVELS[Math.floor(Math.random()*LEVELS.length)]
}

export class Game {
    constructor() {
        this.startGame()
        document.addEventListener('keydown', this.addKeyHandler());

        this.scorePoints = 0
    }

    startGame() {
        this.person = new Person([1, 1], this.lose());
        this.layout = new (getRandomLevel())(
            0,
            this.complete(),
            this.lose(),
            this.addPoints(),
            this.person
        )
        this.GameRootElement = null;
        this.HTMLCovertedLayout = null;

        this.initialDraw()

        this.scorePointsHTML = document.getElementById('score_points')
        this.scorePointsHTML.innerHTML = '000'
        this.updatePointsCounter()

        this.timerHTML = document.getElementById('timer')
        this.timerHTML.innerHTML = '00:00'
        this.timer = setInterval(this.updateTimer(), 1000)
        this.timerValue = 0
        this.updateTimer()

        this.tick = setInterval(this.updateObjects(), 500, this.layout.getObjectLayout())
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

    updatePointsCounter() {
        if (this.scorePoints === undefined) {
            this.scorePointsHTML.innerHTML = '000'
            return
        }
        this.scorePointsHTML.innerHTML = this.scorePoints
    }

    updateTimer() {
        let game = this
        return () => {
            game.timerValue += 1
            if ((game.timerValue % 60) < 10) {
                game.timerHTML.innerHTML = `0${~~(game.timerValue / 60)}:0${game.timerValue%60}`
            } else {
                game.timerHTML.innerHTML = `0${~~(game.timerValue / 60)}:${game.timerValue%60}`
            }
        }
    }

    addPoints() {
        let game = this
        return (points) => {
            console.log(game.scorePoints, points)
            game.scorePoints += points
            game.updatePointsCounter()
        }
    }

    stopIntervals () {
        clearInterval(this.timer)
        clearInterval(this.tick)
    }

    complete() {
        let game = this
        return () => {
            game.stopIntervals()
            game.startGame()

        }
    }

    lose() {
        let game = this
        return () => {
            game.scorePoints = 0
            game.updatePointsCounter()
            alert('Вы проиграли')
            game.stopIntervals()
            game.startGame()
        }
    }
}