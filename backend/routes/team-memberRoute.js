const express = require('express');
const teamController = require('../controllers/teamMemberController');
const {saveImage, uploadImage} = require('../controllers/imageController');

const router = express.Router();

router.get('/', teamController.getMembers);

// admin routes
router.put('/add', uploadImage.single('image'),saveImage('assets/team-images/'), teamController.addMember);
router.post('/update/:name', uploadImage.single('image'),saveImage('assets/team-images/'), teamController.updateMember);
router.delete('/delete/:name', teamController.deleteMember);

module.exports = router;