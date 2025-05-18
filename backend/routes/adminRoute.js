const express = require('express');
const adminController = require('../controllers/adminController.js');
const multer = require('multer');
const upload = multer();
const router = express.Router();



router.get('/', adminController.getAdmins);
// here you'll define the admin routes
router.post('/add',upload.none(),adminController.createAdmin);
router.post('/authenticate', adminController.authenticateAdmin);
router.delete('/delete/:id', adminController.deleteAdmin);
router.put('/update/:id', adminController.updateAdminPassword);



module.exports = router;