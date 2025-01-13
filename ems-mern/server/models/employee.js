// models/employee.js
const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    taskCounts: {
        active: { type: Number, default: 0 },
        newTask: { type: Number, default: 0 },
        completed: { type: Number, default: 0 },
        failed: { type: Number, default: 0 },
    },
    tasks: [{
          taskTitle: {type:String},
          taskDescription: {type:String},
          taskDate: {type:String},
          category: {type:String},
          active: {type:Boolean,default:true},
          newTask: {type:Boolean,default:true},
          completed: {type:Boolean,default:false},
          failed: {type:Boolean,default:false},
        }],
});

module.exports = mongoose.model('Employee', employeeSchema);