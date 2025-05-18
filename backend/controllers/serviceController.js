const serviceModel = require('../models/serviceModel');
const jwt = require('jsonwebtoken');
const key = process.env.ADMIN_TOCKEN;

const getServices = (req, res) => {
    serviceModel.find({lang:'EN'}).sort({ orderOfDisplay: 1 }).select('-_id -__v')
    .then(result =>{
        res.send(result);
    })
    .catch(err => {
        console.log(err);
        res.status(500).send('error getting services');
    });
};

const getServiceByName = (req, res) =>{
    const serviceName = req.parms.name;

    serviceModel.find({name:serviceName,lang:'EN'})
    .then(result =>{
        res.send(result);
    })
    .catch(err =>{
        console.log(err);
        res.status(500).send('error getting service ${serviceName}');
    });
};

const getServicesAr = (req,res) =>{
    serviceModel.find({lang:'AR'}).sort({orderOfDisplay:1})
    .then(result =>{
        res.send(result);
    })
    .catch(err =>{
        console.log(err);
        res.status(500).send('error getting services');
    });
};

const getServiceByNameAr = (req, res) =>{
    const serviceName = req.parms.name;

    serviceModel.find({name:serviceName, lang:'AR'})
    .then(result =>{
        res.send(result);
    })
    .catch(err =>{
        console.log(err);
        res.status(500).send('error getting service ${serviceName}');
    });
};


const addService = (req, res) => {
    
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
        const service = new serviceModel(body);
    
        service.save()
        .then(result => {
            res.send(result);
        })
        .catch(err => {
            console.log(err);
            res.status(500).send('error adding service');
        });
    };

const updateService = (req, res) => {
    const token = req.headers.authorization.split(' ')[1];
    const decoded = jwt.verify(token, key);

    if (!decoded) {
        return res.status(401).json({ message: 'Invalid token' });
    }

    const serviceName = req.params.serviceName;
    const body = req.body;

    if(req.file){
        console.log(req.file.originalname);
        body.image = req.file.originalname;
    }
    else{
     //   delete body.image;
     console.log('no image');
    }
    body.orderOfDisplay = parseInt(body.orderOfDisplay);

    serviceModel.findOneAndUpdate({
        serviceName: serviceName
    }, body, { new: true })
        .then(result => {
            res.send(result);
        }).catch(err => {
            console.log(err);
        });
};    

const deleteService = (req, res) => {
    const token = req.headers.authorization.split(' ')[1];
    const decoded = jwt.verify(token, key);

    if (!decoded) {
        return res.status(401).json({ message: 'Invalid token' });
    }

    const serviceName = req.params.serviceName;

    serviceModel.findOneAndDelete({
        serviceName: serviceName
    }).then(result => {
        res.send(result);
    }).catch(err => {
        console.log(err);
        res.status(500).send('error deleting service');
    });
    
};


module.exports = {
    getServices,
    getServicesAr,
    getServiceByName,
    getServiceByNameAr,
    addService,
    updateService,
    deleteService
};