import { HashSet, initTwoDementialArray, shuffleArray } from './util.js';


export class Layout {
    constructor(size) {
        this.size = size;
        this.layout = initTwoDementialArray(size, 1);
        this.needConnectPoints = new HashSet();
        this.generateLayout();
        this.placeExit()
    }

    getLayout() {
        return this.layout;
    }

    placeExit() {
        this.layout[this.size-2][this.size-2] = 8
    }
    
    generateLayout() {

        let start_i = 1;
        let start_j = 1;

        this.needConnectPoints.add([start_i, start_j]);

        while (this.needConnectPoints.count() > 0) {
            let point = this.needConnectPoints.getAndRemoveRandomElement();
            
            let i = point[0]
            let j = point[1]


            this.layout[i][j] = 0
            
            this.connect(i, j)
            this.addToVisitPoints(i, j)
        }
    }
    
    connect(i, j) {
        let directions = shuffleArray([
            [-1, 0],
            [1, 0],
            [0, -1],
            [0, 1]
        ])

        for (let k = 0; k < directions.length; k++) {
            let directionI = directions[k][0]
            let directionJ = directions[k][1]

            let neighborI = i + (directionI * 2)
            let neighborJ = j + (directionJ * 2)

            if (this.pointsInLayout(neighborI, neighborJ) && this.layout[neighborI][neighborJ] === 0) {
                let connectorI = i + directionI;
                let connectorJ = j + directionJ;
                this.layout[connectorI][connectorJ] = 0
                return
            }
        }

    }

    addToVisitPoints(i, j) {

        if (this.pointsInLayout(i - 2, j) && this.layout[i - 2][j] === 1) {
            this.needConnectPoints.add([i-2, j])
        }
        if (this.pointsInLayout(i + 2, j) && this.layout[i + 2][j] === 1) {
            this.needConnectPoints.add([i+2, j])
        }
        if (this.pointsInLayout(i, j - 2) && this.layout[i][j - 2] === 1) {
            this.needConnectPoints.add([i, j-2])
        }
        if (this.pointsInLayout(i, j + 2) && this.layout[i][j + 2] === 1) {
            this.needConnectPoints.add([i, j+2])
        }
    }

    pointsInLayout(i, j) {
        return i > 0 && j > 0 && i < this.size - 1 && j < this.size - 1
    }
}