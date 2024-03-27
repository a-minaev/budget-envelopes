const express = require('express');
const router = express.Router();

const envelopeList = require('./database');

const { getEnvelopes,
        getEnvelope, 
        deposit, 
        verifyBalance, 
        withdrawAmount, 
        transferAmount } = require('./database/queries');

router.param('id', (req, res, next, id) => {
    req.id = Number(id);
    console.log(req.id);
    next();
});

router.get('/envelopes', getEnvelopes);

router.get('/envelope/:id', getEnvelope);

router.put('/envelope/:id/deposit', deposit);

router.put('/envelope/:id/withdraw', verifyBalance, withdrawAmount);

router.put('/transfer', verifyBalance, transferAmount);




module.exports = router;