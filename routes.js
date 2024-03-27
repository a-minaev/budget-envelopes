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

router.get('/envelopes/:id', getEnvelope);

router.put('/envelopes/:id/deposit', deposit);

router.put('/envelopes/:id/withdraw', verifyBalance, withdrawAmount);

router.put('/transfer', verifyBalance, transferAmount);




module.exports = router;