const memberModel = require('../models/team-memberModel')
const jwt = require('jsonwebtoken');
const key = process.env.ADMIN_TOCKEN;

const getMembers = (req, res) => {
    memberModel.find().sort({orderOfDisplay: 1}).select('-_id -__v')
    .then(result => {
        res.send(result);
    })
    .catch(err =>{
        console.log(err);
        res.status(500).send('error getting members');
    });
};


const addMember = (req, res) => {
    const token = req.headers.authorization.split(' ')[1];
    const decoded = jwt.verify(token, key);

    if (!decoded) {
        return res.status(401).json({ message: 'Invalid token' });
    }

    const body = req.body;

    if(req.file){
        body.image = req.file.originalname;
    }

    body.orderOfDisplay = parseInt(body.orderOfDisplay);
    const member = new memberModel(body);

    member.save()
    .then(result =>{
        res.send(result);
    })
    .catch(err =>{
        console.log(err);
        res.status(500).send('error adding member');
    });
};

const updateMember = (req, res) => {
    const token = req.headers.authorization.split(' ')[1];
    const decoded = jwt.verify(token, key);

    if (!decoded) {
        return res.status(401).json({ message: 'Invalid token' });
    }

    const name = req.params.name;

    if(req.file){
        req.body.image = req.file.originalname;
    }

    const body = req.body;

    memberModel.findOneAndUpdate({
        name:name
    },body,{new:true})
    .then(result =>{
        res.send(result);
    })
};

const deleteMember = (req, res) => {
    const token = req.headers.authorization.split(' ')[1];
    const decoded = jwt.verify(token, key);

    if (!decoded) {
        return res.status(401).json({ message: 'Invalid token' });
    }

    const name = req.params.name;

    memberModel.findOneAndDelete({
        name:name
    }).then( result => {
        res.send(result);
    }).catch(err => {
        console.log(err);
        res.status(500).send('error deleting member');
    });
};

module.exports = {
    getMembers,
    addMember,
    updateMember,
    deleteMember
};
