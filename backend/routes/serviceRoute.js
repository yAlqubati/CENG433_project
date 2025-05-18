const express = require('express');
const serviceController = require('../controllers/serviceController');
const {saveImage, uploadImage} = require('../controllers/imageController');

const router = express.Router();

router.get('/ar', serviceController.getServicesAr);
router.get('/ar/:serviceName', serviceController.getServiceByNameAr);

router.get('/', serviceController.getServices);
router.get('/:serviceName', serviceController.getServiceByName);

// here you'll define the admin routes
router.put('/add', uploadImage.single('image'),saveImage('assets/service-images/'), serviceController.addService);
router.post('/update/:serviceName', uploadImage.single('image'),saveImage('assets/service-images/'), serviceController.updateService);
router.delete('/delete/:serviceName', serviceController.deleteService);

module.exports = router;