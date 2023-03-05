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
        let task = await Task.findById(req.params.id);
        let checklist = await Checklist.findById(task.checklist);
        let taskToRemove = checklist.tasks.indexOf(task._id);
        checklist.tasks.splice(taskToRemove, 1)
        checklist.save().catch(err => console.log("Erro delete: ", err))
        console.log('delete')
        res.redirect(`/checklists/${checklist._id}`)
    } catch(error) {
        res.status(422).render('pages/error', { error: "Erro ao remover uma tarefa"})

    }
})

checklistDepedentRoute.post('/:id/tasks', async (req, res) => {

    
    let { name } = req.body.task //recebe parametro p/ descrever a task 
    let task = new Task({ name, checklist: req.params.id }) //cria a nova task e passa o ID da checklist que vai ser usada
    console.log("Id da checklist: " + req.params.id)
    try {
        await task.save().catch(err => console.log("Erro 1: ", err))
        let checklist = await Checklist.findById(req.params.id); // Acha o Checklist que a gente procura
        checklist.tasks.push(task) // Salva a task dentro desse checklist especifico, porque isso nao é feito automaticamente
        await checklist.save().catch(err => console.log("Erro 2: ", err));
        res.redirect(`/checklists/${req.params.id}`)

    } catch (error) {
        let errors = error.errors
        res.status(422).render('tasks/new', { task: { ...task, errors }, checklistId: req.params.id})
    }
    
})

simpleRouter.put('/:id', async (req, res) => {
    let task = await Task.findById(req.params.id)
    try {
        task.set(req.body.task);
        await task.save();
        res.status(200).json({ task })
    } catch (error) {
        let errors = error.erros;
        res.status(422).json({ task: { ...errors }})
    }
})

module.exports = {
    checklistDepedent: checklistDepedentRoute,
    simple: simpleRouter
}