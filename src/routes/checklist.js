const express = require('express')

const router = express.Router();

const Checklist = require("../models/checklist")

router.get('/', (req, res) => {
    console.log("passamos aqui")
    res.send();
})

router.post('/', async (req, res)  => {
    let { name } = req.body;

    try {
        let checklist = await Checklist.create({ name })
        res.status(200).json(checklist);
    } catch (err) {
        res.status(422).json(err)
    }
})

router.get('/:id', (req, res) => {
    console.log(req.params.id);
    res.send(`ID: ${req.params.id}`)
})

router.put('/:id', (req, res) => {
    console.log(req.body)  
    res.send(`PUT ID: ${req.params.id}`) 
})

router.delete('/:id', (req, res) => {
    console.log(req.body)  
    res.send(`DELETE ID: ${req.params.id}`) 
})

module.exports = router;    