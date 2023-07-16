const size = 728
const totalSize = 1000
const trainingSize = Math.floor(totalSize * 0.8)

const CategoryType = {

    BOOMERANG: 0,
    RAINBOW: 1,
    TRAIN: 2,

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



function preload() {
    trains.data = loadBytes('data/trains.bin')
    rainbows.data = loadBytes('data/rainbows.bin')
    boomerangs.data = loadBytes('data/boomerangs.bin')
}

function setup() {
    createCanvas(280, 280)
    background(0)
    // displayImages()


    prepareData(trains, CategoryType.TRAIN)
    prepareData(rainbows, CategoryType.RAINBOW)
    prepareData(boomerangs, CategoryType.BOOMERANG)

    // MAKINGNEURAL  NETWORK
    let nn = new NeuralNetwork(728, 64, 3)

    // RANDOMIZING DATA
    let training = []
    training = training.concat(boomerangs.training)
    training = training.concat(rainbows.training)
    training = training.concat(trains.training)
    shuffle(training, true)


    // TRAINING NEURAL NETWORK
    for (let data of training) {
        let target = [0, 0, 0]
        target[data.label] = 1
        nn.train(data, target)
    }
    console.log('done')
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

}