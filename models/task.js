const mongoose = require('mongoose')

const taskSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please provide a task name'],
        trim: true, // remove leading and trailing spaces
        maxlength: [20, 'Name cannot be more than 20 characters']
    },
    completed: {
        type: Boolean,
        default: false
    }
})

// export created model to the controller
module.exports = mongoose.model('Task', taskSchema)