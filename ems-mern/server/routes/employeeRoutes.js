const express = require('express');
  const Employee = require('../models/employee');
  const mongoose = require('mongoose');
  const router = express.Router();


   // Get all employees
   router.get('/', async (req, res) => {
     try {
       const employees = await Employee.find({});
       res.json(employees);
     } catch (error) {
       res.status(500).json({ message: error.message });
     }
   });
   // Register a new employee
   router.post('/', async (req, res) => {
     const { firstName, email, password } = req.body;
     const employee = new Employee({ firstName, email, password });
     try {
       const newEmployee = await employee.save();
       res.status(201).json(newEmployee);
     } catch (error) {
       res.status(400).json({ message: error.message });
     }
   });

     // Login employee
   router.post('/login', async (req, res) => {
       try {
           const { email, password } = req.body;
             const user = await Employee.findOne({ email });
          if (!user || user.password != password) {
                 return res
                   .status(401)
                  .render('login',{error:"Invalid credentials"});
           }
             return res.render('dashboard/employeeDashboard', { data: user, changeUser:function(id){} });
      } catch (err) {
         res.status(500).json({ message: err.message });
       }
     });
     router.get("/dashboard",async(req,res)=>{
      try{
         const { employeeId } = req.query;
        const employee = await Employee.findById(employeeId);
          if(employee){
            return res.render('dashboard/employeeDashboard',{data:employee,changeUser:function(id){}, firstName:employee.firstName})
           }else {
             return res.status(404).send("Employee Not found");
             }
      }catch(err){
         res.status(500).json({ message: err.message });
       }
 });
   router.post("/admin/login", async (req, res) => {
       try {
         const { email, password } = req.body;
           if(email=='admin@me.com' && password=='123'){
                const employees = await Employee.find({});
               return res.render('dashboard/adminDashboard', { role: 'admin', firstName: 'Admin', changeUser:function(id){}, userData:employees });
              } else{
                 res.status(401).render('login',{error:"Invalid credentials"});
            }
       } catch (err) {
          res.status(500).json({ message: err.message });
      }
   });

   router.get('/accept-task/:taskId', async (req, res) => {
    try {
        const { taskId } = req.params;
        const { employeeId } = req.query;
         const employee = await Employee.findById(employeeId);
         if (employee) {
           const updatedEmployee = { ...employee.toObject() };
             updatedEmployee.tasks = updatedEmployee.tasks.map(task =>
                 task.id == taskId ? { ...task, active:true, newTask: false } : task
             );
          const updatedEmp =  await Employee.findByIdAndUpdate(employeeId,updatedEmployee,{new:true});
          const employees = await Employee.find({});
             return res.json({message:"Accepted task",data:employees});
       } else {
              return res.status(404).send("Employee Not found");
           }
    } catch (err) {
         res.status(500).json({ message: err.message });
      }
  });

 router.get('/complete-task/:taskId', async (req, res) => {
    try {
           const {taskId} = req.params;
         const {employeeId} = req.query;
           const employee = await Employee.findById(employeeId);
             if(employee){
                const updatedEmployee = { ...employee.toObject() };
                 updatedEmployee.tasks = updatedEmployee.tasks.map(task =>
                     task.id == taskId ? { ...task, active:false, completed:true } : task
               );
                 const updatedEmp = await Employee.findByIdAndUpdate(employeeId,updatedEmployee,{new:true});
                 const employees = await Employee.find({});
                return res.json({message:"Completed task",data:employees});
              }else {
                   return res.status(404).send("Employee Not found");
              }
       } catch (err) {
         res.status(500).json({ message: err.message });
        }
    });
 router.get('/fail-task/:taskId', async (req, res) => {
     try {
           const {taskId} = req.params;
        const {employeeId} = req.query;
           const employee = await Employee.findById(employeeId);
          if(employee){
             const updatedEmployee = { ...employee.toObject() };
               updatedEmployee.tasks = updatedEmployee.tasks.map(task =>
                 task.id == taskId ? { ...task, active:false, failed:true } : task
              );
             const updatedEmp = await Employee.findByIdAndUpdate(employeeId,updatedEmployee,{new:true});
             const employees = await Employee.find({});
                return res.json({message:"Failed task",data:employees});
            }else {
                 return res.status(404).send("Employee Not found");
              }
    } catch (err) {
          res.status(500).json({ message: err.message });
     }
  });
router.post("/tasks",async(req,res)=>{
  const { employeeId,taskTitle,taskDescription,taskDate,category } = req.body;
    try{
        const employee = await Employee.findById(new mongoose.Types.ObjectId(employeeId))
          if(employee){
              const newTask = {
                 id: employee.tasks.length + 1,
                  active: true,
                 newTask: true,
                 completed: false,
                 failed: false,
                 taskTitle,
                 taskDescription,
                taskDate,
                category: category || "General",
             };
           const updatedEmployee = {...employee.toObject()}
            updatedEmployee.tasks.push(newTask)
              updatedEmployee.taskCounts.newTask+=1
           await Employee.findByIdAndUpdate(employeeId,updatedEmployee)
           const employees = await Employee.find({});
           return res.json({message:"Task created",data:employees});
      }else{
           res.status(404).json({message:'employee Not Found'});
     }
   }catch (err) {
        res.status(400).json({ message: err.message });
      }
  });
router.put("/:id",async(req,res)=>{
const {id}=req.params;
try{
    const updatedEmp = await Employee.findByIdAndUpdate(id,req.body,{new:true});
      return res.json(updatedEmp);
   }catch(err){
       res.status(500).json({message:err.message});
     }
})
module.exports = router;