const express = require('express');
const router = express.Router();

const envelopeList = require('./database');
const envelope = {id:1, name:'Groceries'};

router.param('id', (req, res, next, id) => {
    req.id = id;
    next();
});

router.get('/envelopes', (req, res, next) => {
    res.send(envelopeList); 
});

router.get('/envelope/{id}', (req, res, next) => {
    var envelopeToSend;
    envelopeList.forEach((envelope) => {if (envelope.id == req.id) {
        envelopeToSend = envelope;
    }});
    res.send(envelopeToSend);
});

router.put('/envelope/{id}', (req, res, next) => {

    envelopeList.forEach((envelope) => {if (envelope.id == req.id){
        envelope.addAmount(req.query.amount);
        res.send('Deposited amount');
    }})
});







module.exports = router;