export class HashSet {
    constructor () {
        this.hash = {}
    }

    add(element) {
        this.hash[element] = true
    }

    remove(element) {
        delete this.hash[element]
    }

    getAndRemoveRandomElement() {
        let key = Object.keys(this.hash)[Math.floor(Math.random()*Object.keys(this.hash).length)]
        delete this.hash[key]

        return [parseInt(key.split(',')[0]), parseInt(key.split(',')[1])]
    }

    count() {
        return Object.keys(this.hash).length
    }
}

export function initTwoDementialArray(size, fill) {
    let array = []
    for (let i = 0; i < size; i++) {
        array.push([])
        for(let j = 0; j < size; j++) {
            array[i].push(fill)
        }
    }

    return array
}

export function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array
}