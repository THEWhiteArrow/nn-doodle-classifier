class NeuralNetwork {
    constructor(input_nodes, hidden_nodes, output_nodes, learningRate = 0.1) {
        this.inputNodes = input_nodes
        this.hiddenNodes = hidden_nodes
        this.outputNodes = output_nodes

        this.weightsIH = new Matrix(this.hiddenNodes, this.inputNodes)
        this.weightsHO = new Matrix(this.outputNodes, this.hiddenNodes)
        this.weightsIH.randomize()
        this.weightsHO.randomize()

        this.biasH = new Matrix(this.hiddenNodes, 1)
        this.biasO = new Matrix(this.outputNodes, 1)
        this.biasH.randomize()
        this.biasO.randomize()

        this.learningRate = learningRate
    }
    predict(input_array) {
        return this.feedforward(input_array)
    }

    setLearningRate(lr) {
        this.learningRate = lr
    }

    feedforward(input_array) {
        // PREPARING INPUT DATA
        let inputs = Matrix.fromArray(input_array)

        // GENRATING HIDDEN OOUTPUTS
        let hidden = Matrix.multiply(this.weightsIH, inputs)
        hidden = Matrix.add(hidden, this.biasH)
        // activation  function
        hidden.map(sigmoid)
        let outputs = Matrix.multiply(this.weightsHO, hidden)
        outputs = Matrix.add(outputs, this.biasO)
        // activation  function
        outputs.map(sigmoid)

        return outputs.toArray()
    }

    train(input_array, target_array) {
        // PREPARING INPUT DATA
        let inputs = Matrix.fromArray(input_array)

        // GENRATING HIDDEN OOUTPUTS
        let hidden = Matrix.multiply(this.weightsIH, inputs)
        hidden = Matrix.add(hidden, this.biasH)
        // activation  function
        hidden.map(sigmoid)
        let outputs = Matrix.multiply(this.weightsHO, hidden)
        outputs = Matrix.add(outputs, this.biasO)
        // activation  function
        outputs.map(sigmoid)

        // PREPARING TARGET DATA
        let targets = Matrix.fromArray(target_array)

        // CALCULATING ERROR 
        let outputErrors = Matrix.subtract(targets, outputs)

        // CALCULATING GRADIENT
        let gradients = Matrix.map(outputs, dsigmoid)
        gradients.multiply(outputErrors)
        gradients.multiply(this.learningRate)

        // CALCULATING DELTA
        let hiddenT = Matrix.transpose(hidden)
        let weightsHODelta = Matrix.multiply(gradients, hiddenT)

        // ADJUSTING WEIGHTS
        this.weightsHO.add(weightsHODelta)
        this.biasO.add(gradients)

        // CALCULATING HIDDEN ERRORS
        let weightsHOT = Matrix.transpose(this.weightsHO)
        let hiddenErrors = Matrix.multiply(weightsHOT, outputErrors)

        // CALCULATING HIDDEN GRADIENTS
        let hiddenGradients = Matrix.map(hidden, dsigmoid)
        hiddenGradients.multiply(hiddenErrors)
        hiddenGradients.multiply(this.learningRate)

        // CALCULATING HIDDEN DELTA
        let inputsT = Matrix.transpose(inputs)
        let weightsIHDelta = Matrix.multiply(hiddenGradients, inputsT)

        // ADJUSTING WEIGHTS
        this.weightsIH.add(weightsIHDelta)
        this.biasH.add(hiddenGradients)

    }
}

