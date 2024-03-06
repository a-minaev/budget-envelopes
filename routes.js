const express = require('express');
const router = express.Router();

const envelopeList = require('./database');
const envelope = {id:1, name:'Groceries'};

router.param('id', (req, res, next, id) => {
    req.id = id;
    next();
});

router.get('/envelopes', (req, res, next) => {
    res.status(200).send(envelopeList); 
});

router.get('/envelope/{id}', (req, res, next) => {

    envelopeList.forEach((envelope) => {if (envelope.id == req.id) {
        res.status(200).send(envelope);
    }});
    res.status(404).send();
    
});

router.put('/envelope/{id}', (req, res, next) => {

    envelopeList.forEach((envelope) => {if (envelope.id == req.id){
        envelope.addAmount(req.query.amount);
        res.status(200).send('Deposited amount');
    }})
    res.status(404).send('Envelope with that ID does not exist');
});







module.exports = router;