const size = 728
const totalSize = 1000
const trainingSize = Math.floor(totalSize * 0.8)

class Category {
    constructor() {
        this.data = Object
        this.training = Array
        this.testing = Array
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


    prepareData(trains)
    prepareData(rainbows)
    prepareData(boomerangs)

    // displayImages()
}

function prepareData(category = Category) {
    for (let i = 0; i < totalSize; ++i)
        if (i < trainingSize)
            category.training[i] = category.data.bytes.subarray(i * size, (i + 1) * size)
        else
            category.testing[i - trainingSize] = category.data.bytes.subarray(i * size, (i + 1) * size)
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