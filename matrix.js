const sigmoid = x => 1.0 / (1 + Math.exp(-x))
const dsigmoid = y => y * (1 - y)

class Matrix {
    constructor(rows, cols) {
        this.rows = rows
        this.cols = cols
        this.data = []

        for (let i = 0; i < this.rows; ++i) {
            this.data[i] = []
            for (let j = 0; j < this.cols; j++)
                this.data[i][j] = 0
        }
    }

    randomize() {
        for (let i = 0; i < this.rows; ++i)
            for (let j = 0; j < this.cols; ++j)
                this.data[i][j] = Math.random() * 2 - 1

    }

    add(n) {
        n instanceof Matrix ? this.addMatrix(n) : this.addNumber(n)
    }

    addMatrix(m) {
        if (this.rows != m.rows || this.cols != m.cols) {
            console.log('aINCORRECT NUMBER OF ROWS VS COLS WHILE ADDING')
            return undefined
        }

        for (let i = 0; i < this.rows; ++i)
            for (let j = 0; j < this.cols; ++j)
                this.data[i][j] += m.data[i][j]

    }

    addNumber(n) {
        for (let i = 0; i < this.rows; ++i)
            for (let j = 0; j < this.cols; ++j)
                this.data[i][j] += n
    }


    multiply(n) {
        if (n instanceof Matrix) {
            // hadamard product
            if (this.rows != n.rows || this.cols != n.cols) {
                console.log('INCORRECT NUMBER OF ROWS VS COLS WHILE MULTIPLYING')
                return undefined
            }
            for (let i = 0; i < this.rows; ++i)
                for (let j = 0; j < this.cols; ++j)
                    this.data[i][j] *= n.data[i][j]
        } else {
            // scalar product
            for (let i = 0; i < this.rows; ++i)
                for (let j = 0; j < this.cols; ++j)
                    this.data[i][j] *= n
        }
        return this
    }

    map(func) {
        for (let i = 0; i < this.rows; ++i)
            for (let j = 0; j < this.cols; ++j)
                this.data[i][j] = func(this.data[i][j])

    }

    toArray() {
        let arr = []
        for (let i = 0; i < this.rows; ++i)
            for (let j = 0; j < this.cols; ++j)
                arr.push(this.data[i][j])
        return arr
    }

    static add(a, b) {
        if (a.rows != b.rows || a.cols != b.cols) {
            console.log('INCORRECT NUMBER OF ROWS VS COLS WHILE ADDING')
            return undefined
        }

        let result = new Matrix(a.rows, a.cols)
        for (let i = 0; i < result.rows; ++i)
            for (let j = 0; j < result.cols; ++j)
                result.data[i][j] = a.data[i][j] + b.data[i][j]
        return result
    }

    static subtract(a, b) {
        if (a.rows != b.rows || a.cols != b.cols) {
            console.log('INCORRECT NUMBER OF ROWS VS COLS WHILE SUBTRACTING')
            return undefined
        }

        let result = new Matrix(a.rows, a.cols)
        for (let i = 0; i < result.rows; ++i)
            for (let j = 0; j < result.cols; ++j)
                result.data[i][j] = a.data[i][j] - b.data[i][j]
        return result

    }

    static multiply(a, b) {
        if (a.cols != b.rows) {
            console.log('INCORRECT NUMBER OF ROWS VS COLS WHILE MULTIPLYING')
            return undefined
        }

        let result = new Matrix(a.rows, b.cols)
        for (let i = 0; i < result.rows; ++i)
            for (let j = 0; j < result.cols; ++j) {
                let sum = 0
                for (let k = 0; k < a.cols; ++k)
                    sum += a.data[i][k] * b.data[k][j]
                result.data[i][j] = sum
            }
        return result
    }





    static transpose(m) {
        let result = new Matrix(m.cols, m.rows)
        for (let i = 0; i < m.rows; ++i)
            for (let j = 0; j < m.cols; ++j)
                result.data[j][i] = m.data[i][j]
        return result
    }

    static fromArray(arr) {
        let result = new Matrix(arr.length, 1)
        for (let i = 0; i < arr.length; ++i)
            result.data[i][0] = arr[i]
        return result
    }

    static map(m, func) {
        let result = new Matrix(m.rows, m.cols)
        for (let i = 0; i < m.rows; ++i)
            for (let j = 0; j < m.cols; ++j)
                result.data[i][j] = func(m.data[i][j])
        return result
    }

    log() {
        console.table(this.data)
    }
}

if (typeof module !== 'undefined')
    module.exports = Matrix