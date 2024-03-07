const express = require('express');
const router = express.Router();

const envelopeList = require('./database');
const envelope = {id:1, name:'Groceries'};

router.param('id', (req, res, next, id) => {
    req.id = Number(id);
    console.log(req.id);
    next();
});

router.get('/envelopes', (req, res, next) => {
    res.status(200).send(envelopeList); 
});

router.get('/envelope/:id', (req, res, next) => {

    envelopeList.forEach((envelope) => {console.log(envelope.id); 
        if (envelope.id == req.id) {
            res.status(200).send(envelope);
        }
    });
    res.status(404).send();
    
});

router.put('/envelope/:id/deposit', (req, res, next) => {

    envelopeList.forEach((envelope) => {if (envelope.id == req.id){
        envelope.addAmount(req.query.amount);
        res.status(200).send('Deposited amount');
    }})
    res.status(404).send('Envelope with that ID does not exist');
});

router.put('/envelope/:id/withdraw', (req, res, next) => {
    try{
        envelopeList.forEach((envelope) => {if (envelope.id == req.id){
            envelope.withdrawAmount(req.query.amount);
            res.status(200).send(`We've withdrawn ${req.query.amount} from ${envelope.name}`);
        }})
    } catch(err){
        next(err);
    }
});

router.put('/transfer', (req,res,next) => {
    const transferFrom = req.query.account1
    const transferTo = req.query.account2

    try{
        envelopeList.forEach((envelope) => {if (envelope.id == transferFrom){
            envelope.withdrawAmount(req.query.amount);
        }})
        envelopeList.forEach((envelope) => {if (envelope.id == transferTo){
            envelope.addAmount(req.query.amount);
            res.status(200).send(`Amount successfully transfered`);
        }})
    } catch(err) {
        next(err)
    }
});






module.exports = router;