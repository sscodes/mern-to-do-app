const Joi = require('joi');
const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        maxlength: 100
    }
});

const Task = mongoose.model('Task', taskSchema);

function validate(name) {
    const schema = Joi.object({
        name: Joi.string().max(100).required()
    })
    return schema.validate(name);
}

module.exports.taskSchema = taskSchema;
module.exports.Task = Task;
module.exports.validate = validate;