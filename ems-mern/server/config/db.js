const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Employee = require('../models/employee')
dotenv.config();

const generateId = () => {
     return Math.floor(Math.random() * 1000000);
};
  const employees = [
      {
          "id": generateId(),
          "firstName": "Arjun",
          "email": "e@e.com",
          "password": "123",
          "taskCounts": {
              "active": 2,
              "newTask": 1,
              "completed": 1,
              "failed": 0
          },
          "tasks": [
              {
                  "id": 1,
                  "active": true,
                  "newTask": true,
                  "completed": false,
                  "failed": false,
                  "taskTitle": "Update website",
                  "taskDescription": "Revamp the homepage design",
                  "taskDate": "2024-10-12",
                  "category": "Design"
              },
              {
                  "id": 2,
                  "active": false,
                  "newTask": false,
                  "completed": true,
                  "failed": false,
                  "taskTitle": "Client meeting",
                  "taskDescription": "Discuss project requirements",
                  "taskDate": "2024-10-10",
                  "category": "Meeting"
              },
              {
                  "id": 3,
                  "active": true,
                  "newTask": false,
                  "completed": false,
                  "failed": false,
                  "taskTitle": "Fix bugs",
                  "taskDescription": "Resolve bugs reported in issue tracker",
                  "taskDate": "2024-10-14",
                  "category": "Development"
              }
          ]
      },
      {
          "id": generateId(),
          "firstName": "Sneha",
          "email": "employee2@example.com",
          "password": "123",
          "taskCounts": {
              "active": 1,
              "newTask": 0,
              "completed": 1,
              "failed": 0
          },
          "tasks": [
              {
                  "id": 1,
                  "active": true,
                  "newTask": false,
                  "completed": false,
                  "failed": false,
                  "taskTitle": "Database optimization",
                  "taskDescription": "Optimize queries for better performance",
                  "taskDate": "2024-10-11",
                  "category": "Database"
              },
              {
                  "id": 2,
                  "active": false,
                  "newTask": false,
                  "completed": true,
                  "failed": false,
                  "taskTitle": "Design new feature",
                  "taskDescription": "Create mockups for the new feature",
                  "taskDate": "2024-10-09",
                  "category": "Design"
              }
          ]
      },
      {
          "id": generateId(),
          "firstName": "Ravi",
          "email": "employee3@example.com",
          "password": "123",
          "taskCounts": {
              "active": 2,
              "newTask": 1,
              "completed": 1,
              "failed": 0
          },
          "tasks": [
              {
                  "id": 1,
                  "active": true,
                  "newTask": true,
                  "completed": false,
                  "failed": false,
                  "taskTitle": "Prepare presentation",
                  "taskDescription": "Prepare slides for upcoming client presentation",
                  "taskDate": "2024-10-13",
                  "category": "Presentation"
              },
              {
                  "id": 2,
                  "active": true,
                  "newTask": false,
                  "completed": false,
                  "failed": false,
                  "taskTitle": "Code review",
                  "taskDescription": "Review the codebase for optimization",
                  "taskDate": "2024-10-12",
                  "category": "Development"
              },
              {
                  "id": 3,
                  "active": false,
                  "newTask": false,
                  "completed": true,
                  "failed": false,
                  "taskTitle": "Testing",
                  "taskDescription": "Test the latest build for bugs",
                  "taskDate": "2024-10-08",
                  "category": "QA"
              }
          ]
      },
      {
          "id": generateId(),
          "firstName": "Priya",
          "email": "employee4@example.com",
          "password": "123",
          "taskCounts": {
              "active": 2,
              "newTask": 1,
              "completed": 0,
              "failed": 0
          },
          "tasks": [
              {
                  "id": 1,
                  "active": true,
                  "newTask": true,
                  "completed": false,
                  "failed": false,
                  "taskTitle": "Write documentation",
                  "taskDescription": "Update the project documentation",
                  "taskDate": "2024-10-13",
                  "category": "Documentation"
              },
              {
                  "id": 2,
                  "active": true,
                  "newTask": false,
                  "completed": false,
                  "failed": false,
                  "taskTitle": "Set up CI/CD",
                  "taskDescription": "Implement continuous integration pipeline",
                  "taskDate": "2024-10-11",
                  "category": "DevOps"
              }
          ]
      },
      {
          "id": generateId(),
          "firstName": "Karan",
          "email": "employee5@example.com",
          "password": "123",
          "taskCounts": {
              "active": 2,
              "newTask": 1,
              "completed": 1,
              "failed": 0
          },
          "tasks": [
              {
                  "id": 1,
                  "active": true,
                  "newTask": true,
                  "completed": false,
                  "failed": false,
                  "taskTitle": "UI redesign",
                  "taskDescription": "Redesign the user interface for better UX",
                  "taskDate": "2024-10-14",
                  "category": "Design"
              },
              {
                  "id": 2,
                  "active": false,
                  "newTask": false,
                  "completed": true,
                  "failed": false,
                  "taskTitle": "Deploy new build",
                  "taskDescription": "Deploy the latest build to production",
                  "taskDate": "2024-10-09",
                  "category": "DevOps"
              },
              {
                  "id": 3,
                  "active": true,
                  "newTask": false,
                  "completed": false,
                  "failed": false,
                  "taskTitle": "Client feedback",
                  "taskDescription": "Gather feedback from clients after product launch",
                  "taskDate": "2024-10-12",
                  "category": "Support"
              }
          ]
      }
  ];


    const connectDB = async () => {
        try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('MongoDB connected');
        // Seeding code
            if(process.env.NODE_ENV !== 'test'){
                const existingEmployees = await Employee.find({});
                if(!existingEmployees || existingEmployees.length === 0){
                    await Employee.insertMany(employees)
                    console.log("Data seeded")
                }

            }
        } catch (error) {
        console.error('MongoDB connection error:', error);
        process.exit(1);
        }
    };

module.exports = connectDB;