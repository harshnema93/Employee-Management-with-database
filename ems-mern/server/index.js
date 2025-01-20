const express = require('express');
        const cors = require('cors');
        const dotenv = require('dotenv');
        const connectDB = require('./config/db');
        const path = require("path");
        const employeeRoutes = require('./routes/employeeRoutes');


        // Load env variables
        dotenv.config();

        // Connect to MongoDB
        connectDB();

        const app = express();

        // Set up ejs
        app.set('view engine', 'ejs');
        app.set('views', path.join(__dirname, 'views'));


        app.use(cors());
        app.use(express.json());
        app.use(express.urlencoded({ extended: true }));

        // Define routes here (see below)
        app.get('/',(req,res)=>{
            res.render('login')
        })
        app.use('/api/employees', employeeRoutes);
        // Start Server
        const PORT = process.env.PORT || 5000;
        app.listen(PORT, () => console.log(`Server running on port ${PORT}`));