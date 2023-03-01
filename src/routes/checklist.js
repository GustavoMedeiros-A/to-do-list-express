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

router.get('/new', async (req, res) => {
    try {
        let checklist = new Checklist();
        res.status(200).render('checklists/new', { checklist: checklist})
    } catch(error) {
        res.status(500).render('pages/error', { error: 'Erro ao carregar o formulário' })
    }
})

router.get('/:id/edit', async (req, res) => {
    try{
        let checklist = await Checklist.findById(req.params.id);
        res.status(200).render('checklists/edit', { checklist: checklist})
    } catch(error) {
        res.status(500).render('pages/error', { error: 'Erro ao exibir a edição de Lista de tarefas' })
    }
})

router.post('/', async (req, res)  => {
    let { name } = req.body.checklist;
    let checklist = new Checklist({name})

    try {
        await checklist.save()
        console.log('passo aqui')
        res.redirect('/checklists')
    } catch (error) {
        res.status(422).render('checklists/new', { checklists: { ...checklist, error } })
    }
})

router.get('/:id', async (req, res) => {
    try {
        let checklist = await Checklist.findById(req.params.id).populate('tasks'); // Populate devolve as tasks que tão no checklist:id
        res.status(200).render('checklists/show', { checklist: checklist} )
    } catch (error) {
        res.status(500).render('pages/error', { error: "Erro ao exibir as Listas de Tarefas"} )
    }

})

router.put('/:id', async (req, res) => {
    let { name } = req.body.checklist // Vindo da page Form.ejs
    let checklist = await Checklist.findById(req.params.id)

    try {
        await checklist.update({name}); //Pega o checklist com base no id na linha de cima, e atualiza ele
        res.redirect('/checklists')
    } catch (error) {
        let errors = error.erros;
        res.status(422).render('checklist/edit', { checklist: {...checklist, errors} })
    }

})

router.delete('/:id', async (req, res) => {
    try {
        let checklist =  await Checklist.findByIdAndRemove(req.params.id);
        res.redirect('/checklists');
    } catch (err) {
        res.status(500).render('pages/error', { error: "Erro ao deletar a Lista de Tarefas" })
    }
})

module.exports = router;    