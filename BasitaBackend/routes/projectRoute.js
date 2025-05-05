const express = require('express');
const projectController = require('../controllers/projectController');
const {saveImage, uploadImage} = require('../controllers/imageController');


const router = express.Router();

// don't forget to include the image stuff

router.get('/ar', projectController.getProjectsAr);
router.get('/ar/:projectName', projectController.getprojectByNameAr);

router.get('/', projectController.getProjects);
router.get('/:projectName', projectController.getProjectByName);


// here you'll define the admin routes
router.put('/add', uploadImage.single('image'), saveImage('assets/project-images/'), projectController.addProject);
router.post('/update/:projectName', uploadImage.single('image'), saveImage('assets/project-images/'), projectController.updateProject);
router.delete('/delete/:projectName', projectController.deleteProject);

module.exports = router;



