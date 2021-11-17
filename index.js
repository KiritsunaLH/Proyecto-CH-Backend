const express = require('express')
const app = express()

const PORT = 8080
const PATH = './products.txt'

const {Container} = require('./container');
const container = new Container(PATH)

app.get('/products', async (req, res) => {
    const data = await container.readFileContainer()
    if (data === undefined) {
        res.status(420).json({
            okay: false,
            msg: 'It failed, too bad'
        })
    }

    res.json({
        okay: true,
        total: data.length,
        data
    })
})

app.get('/randomProduct', async (req, res) => {
    const data = await container.readFileContainer()
    const rndmProduct = Math.floor(Math.random() * 4)
    if (data === undefined) {
        res.status(420).json({
            okay: false,
            msg: 'It failed, too bad'
        })
    }
    res.json({
        okay: true,
        total: data.length,
        data: data[rndmProduct]
    })
})

const server = app.listen(PORT, () => {
    console.log(`Sv listened in port: ${PORT}`);
});

module.exports = server;