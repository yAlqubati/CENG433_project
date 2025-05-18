const projectModel = require('../models/projectModel');

const jwt = require('jsonwebtoken');
const key = process.env.ADMIN_TOCKEN;

const getProjects = (req, res) => {
    projectModel.find({lang:'EN'}).sort({ orderOfDisplay: 1 }).select('-_id -__v')
    .then(result =>{
        res.send(result);
    })
    .catch(err => {
        console.log(err);
        res.status(500).send('error getting projects')
    });
};

const getProjectByName = (req, res) => {
    const projectName = req.params.name;

    projectModel.find({name:projectName,lang:'EN'})
    .then(result =>{
        res.send(result);
    })
    .catch(err =>{
        console.log(err);
        res.status(500).send('error getting project ${projectName}');
    });
};

const getProjectsAr = (req, res) => {
    console.log('getProjectsAr function triggered'); // Add this line for debugging
    projectModel.find({ lang: 'AR' }).sort({ orderOfDisplay: 1 }).select('-_id -__v')
        .then(result => {
            res.send(result);
        })
        .catch(err => {
            console.log(err);
            res.status(500).send('error getting projects');
        });
};

const getprojectByNameAr = (req, res) =>{
    const projectName = req.params.name;
    projectModel.find({name:projectName,lang:'AR'})
    .then(result =>{
        res.send(result);
    })
    .catch(err =>{
        console.log(err);
        res.status(500).send('error getting project ${projectName}');
    });
};

const addProject = (req, res) => {
    const token = req.headers.authorization.split(' ')[1];
    const decoded = jwt.verify(token, key);
    
    if (!decoded) {
        return res.status(401).json({ message: 'Invalid token' });
    }

    const body = req.body;

    // Handle the uploaded image
    if (req.file) {
        body.image = req.file.originalname;
    }

    // Parse order_of_display
    body.order_of_display = parseInt(body.order_of_display);

    // Create a new project instance
    const project = new projectModel(body); // Only instantiate once

    // Save the project to the database
    project.save()
        .then(result => {
            res.send(result); // Send the result as response
        })
        .catch(err => {
            console.log(err);
            res.status(500).send({ message: 'Error saving project', error: err });
        });
};


const updateProject = (req, res) => {
    
        const token = req.headers.authorization.split(' ')[1];
        const decoded = jwt.verify(token, key);
    
        if (!decoded) {
            return res.status(401).json({ message: 'Invalid token' });
        }
    
        const projectName = req.params.projectName;
        const body = req.body;
    
        if (req.file) {
            body.image = req.file.originalname;
        }
    
        body.order_of_display = parseInt(body.order_of_display);
        
        projectModel.findOneAndUpdate({
            projectName: projectName
        }, body, { new: true })
            .then(result => {
                res.send(result);
            })
            .catch(err => {
                console.log(err);
                res.status(500).send('error updating project');
            });
    }


const deleteProject = (req, res) => {
    const token = req.headers.authorization.split(' ')[1];
    const decoded = jwt.verify(token, key);

    if (!decoded) {
        return res.status(401).json({ message: 'Invalid token' });
    }

    const projectName = req.params.projectName;

    projectModel.findOneAndDelete({
        projectName: projectName
    })
        .then(result => {
            res.send(result);
        })
        .catch(err => {
            console.log(err);
            res.status(500).send('error deleting project');
        });
};    


module.exports = {
    getProjects,
    getProjectsAr,
    getProjectByName,
    getprojectByNameAr,
    addProject,
    updateProject,
    deleteProject
};