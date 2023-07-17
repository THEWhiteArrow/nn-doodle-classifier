const size = 728
const totalSize = 1000
const trainingSize = Math.floor(totalSize * 0.8)

const CategoryType = {

    CAT: 0,
    RAINBOW: 1,
    TRAIN: 2,
    // BOOMERANG: 3,
    classification(arr) {
        return arr.indexOf(max(arr))
    },

    name(outputs) {
        let val = this.classification(outputs)
        switch (val) {
            case this.BOOMERANG:
                return 'BOOMERANG'
            case this.RAINBOW:
                return 'RAINBOW'
            case this.TRAIN:
                return 'TRAIN'
            case this.CAT:
                return 'CAT'
        }
    }
}


class Category {
    constructor() {
        this.data = {}
        this.training = new Array(0)
        this.testing = new Array(0)
    }
}

let trains = new Category()
let rainbows = new Category()
let boomerangs = new Category()
let cats = new Category()
let nn
let trainBtn, testBtn, guessBtn, guessP, resetBtn

function preload() {
    trains.data = loadBytes('data/trains.bin')
    rainbows.data = loadBytes('data/rainbows.bin')
    cats.data = loadBytes('data/cats.bin')
    // boomerangs.data = loadBytes('data/boomerangs.bin')
}

function setup() {
    createCanvas(280, 280)
    background(255)
    // displayImages()


    prepareData(trains, CategoryType.TRAIN)
    prepareData(rainbows, CategoryType.RAINBOW)
    prepareData(cats, CategoryType.CAT)
    // prepareData(boomerangs, CategoryType.BOOMERANG)

    // MAKINGNEURAL  NETWORK
    nn = new NeuralNetwork(728, 64, 3)


    trainBtn = createButton('TRAIN')
    testBtn = createButton('TEST')
    guessBtn = createButton('GUESS')
    guessP = createP()
    resetBtn = createButton('RESET')

    trainBtn.mousePressed(trainEpoch)
    testBtn.mousePressed(() => alert(`PERCENTAGE : ${testAll()}`))
    guessBtn.mousePressed(() => {
        let inputs = []
        let img = get()
        img.resize(28, 28)
        img.loadPixels()

        for (let i = 0; i < size; ++i) {
            let bright = img.pixels[i * 4]
            inputs[i] = (255 - bright) / 255.0
        }

        guessP.html(CategoryType.name(nn.predict(inputs)))
        image(img, 0, 0)
    })
    resetBtn.mousePressed(() => background(255))

}

function testAll() {
    let testing = []
    testing = testing.concat(cats.testing)
    testing = testing.concat(rainbows.testing)
    testing = testing.concat(trains.testing)
    // testing = testing.concat(boomerangs.testing)
    shuffle(testing, true)

    let cnt = 0
    for (let data of testing) {
        let target = [0, 0, 0]
        let inputs = Array.from(data).map(el => el / 255.0)
        let label = data.label
        target[label] = 1



        let guess = nn.predict(inputs)
        let classification = CategoryType.classification(guess)
        // console.log(classification, label)

        classification == label ? cnt++ : null

    }

    return (cnt / (testing.length * 1.0)) * 100.0

}

function trainEpoch() {
    // RANDOMIZING DATA
    let training = []
    training = training.concat(cats.training)
    training = training.concat(rainbows.training)
    training = training.concat(trains.training)
    // training = training.concat(boomerangs.training)
    shuffle(training, true)


    // TRAINING NEURAL NETWORK FOR ONE EPOCH
    for (let data of training) {
        let target = [0, 0, 0]
        let inputs = Array.from(data).map(el => el / 255.0)
        let label = data.label



        target[label] = 1

        nn.train(inputs, target)
    }
}

function prepareData(category = Category, label) {
    for (let i = 0; i < totalSize; ++i)
        if (i < trainingSize) {
            category.training[i] = category.data.bytes.subarray(i * size, (i + 1) * size)
            category.training[i].label = label
        }
        else {
            category.testing[i - trainingSize] = category.data.bytes.subarray(i * size, (i + 1) * size)
            category.testing[i - trainingSize].label = label
        }
}

function displayImages() {
    let total = 1000
    for (let i = 0; i < total; ++i) {
        let img = createImage(28, 28)
        img.loadPixels()
        let offset = i * 784
        for (let j = 0; j < 784; ++j) {
            let val = 255 - boomerangs.data.bytes[j + offset]
            img.pixels[j * 4 + 0] = val
            img.pixels[j * 4 + 1] = val
            img.pixels[j * 4 + 2] = val
            img.pixels[j * 4 + 3] = 255
        }
        img.updatePixels()
        let x = (i % 10) * 28
        let y = Math.floor(i / 10) * 28
        image(img, x, y)
    }
}

function draw() {
    strokeWeight(10)
    stroke(0)
    if (mouseIsPressed)
        line(pmouseX, pmouseY, mouseX, mouseY)
}