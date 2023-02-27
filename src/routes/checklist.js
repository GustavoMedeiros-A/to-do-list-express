const express = require('express')

const router = express.Router();

const Checklist = require("../models/checklist")

router.get('/', async (req, res) => {
    try {
        let checklists = await Checklist.find();
        res.status(200).render('checklists/index', { checklists: checklists });
    } catch (error) {
        res.status(500).render('pages/error', {  error: 'Erro ao exibir as listas'})
    }
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

router.get('/:id', async (req, res) => {
    try {
        let checklist = await Checklist.findById(req.params.id);
        res.status(200).render('checklists/show', { checklist: checklist} )
    } catch (error) {
        res.status(422).render('pages/error', { error: "Erro ao exibir as Listas de Tarefas"} )
    }

})

router.put('/:id', async (req, res) => {
    let { name } = req.body;

    try {
        let checklist = await Checklist.findByIdAndUpdate(req.params.id, {name}, {new: true}); //Pega o id, atualiza o nome, e retorna o novo nome no postman ja atualizado
        res.status(200).json(checklist);
    } catch (err) {
        res.status(422).json(err);
    }

})

router.delete('/:id', async (req, res) => {
    try {
        let checklist =  await Checklist.findByIdAndRemove(req.params.id);
        res.status(200).json(checklist);
    } catch (err) {
        res.status(422).json(err);
    }
})

module.exports = router;    