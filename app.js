const express = require('express')

const app = express()

app.get('/', (req, res) => {
    res.send("<h1>To do Lista</h1>")
})

app.get('/json', (req, res) => {
    res.json({title: "comprar cafe", done: "true"})
})

app.listen(3000, () => {
    console.log("listening on http://localhost:3000")
})