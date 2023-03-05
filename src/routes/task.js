const express = require('express')

const checklistDepedentRoute = express.Router();
const simpleRouter = express.Router();

const Checklist = require('../models/checklist')
const Task = require('../models/task')

// /checklist/:id/tasks

checklistDepedentRoute.get('/:id/tasks/new', async (req, res) => {
    try {   
        let task = Task();
        res.status(200).render('tasks/new', { checklistId: req.params.id, task: task})
    } catch(error) {
        res.status(422).render('pages/error', { error: "Erro ao carregar o formulário"})
    }
})

simpleRouter.delete('/:id', async (req, res) => {
    try{
        let task = await Task.findById(req.params.id);;
        let checklist = await Checklist.findById(task.checklist);
        let taskToRemove = checklist.tasks.indexOf(task._id);
        checklist.tasks.splice(taskToRemove, 1)
        checklist.save();
        res.redirect(`/checklist/${checklist._id}`)
    } catch(error) {
        res.status(422).render('pages/error', { error: "Erro ao remover uma tarefa"})

    }
})

checklistDepedentRoute.post('/:id/tasks', async (req, res) => {


    let { name } = req.body.task //recebe parametro p/ descrever a task 
    let task = new Task({ name, checklist: req.params.id }) //cria a nova task e passa o ID da checklist que vai ser usada
    
    try {
        await task.save().catch(err => console.log(err))
        let checklist = await Checklist.findById(req.params.id); // Acha o Checklist que a gente procura
        checklist.tasks.push(task) // Salva a task dentro desse checklist especifico, porque isso nao é feito automaticamente
        await checklist.save();
        console.log(task)
        res.redirect(`/checklists/${req.params.id}`)

    } catch (error) {
        let errors = error.errors
        res.status(422).render('tasks/new', { task: { ...task, errors }, checklistId: req.params.id})
    }
})

module.exports = {
    checklistDepedent: checklistDepedentRoute,
    simple: simpleRouter


}