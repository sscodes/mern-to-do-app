const express = require('express');
const route = express.Router();
const mongoose = require('mongoose');
const { Task, validate } = require('../models/task');

//Create a task
route.post('/', async (req, res) => {
    const result = validate(req.body);
    if (!result)
        return res.status(400).send(result.error.details[0].message);

    const task = new Task({
        name: req.body.name
    });

    try {
        await task.save();
        const { _id, name } = task;
        res.status(200).json({
            task: { _id, name }
        });
    }
    catch (err) {
        for (field in err.errors) {
            res.status(400).send(err.errors[field].message);
        }
    }
});

//Read the whole tasks
route.get('/', async (req, res) => {
    const tasks = await Task.find().sort({name:-1});
    res.status(200).json({tasks});
});

//Delete a task
route.delete('/:id', async (req, res) => {
    //check existence
    const task = await Task.findByIdAndRemove(req.params.id);
    if (!task)    //if not found
        return res.status(404).send('The Task was unavailable.');

    //if exists

    //send the deleted task
    res.send(task);
});

module.exports = route;