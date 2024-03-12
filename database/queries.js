const { pool } = require('./config');


const getEnvelopes = ((req, res, next) => {
    pool.query('SELECT * FROM envelopes', (error, results)=>{
        if(error){
            next(error);
        }
        else res.status(200).json(results.rows);
    })
})

const getEnvelope = ((req, res, next) => {
    pool.query('SELECT * FROM envelopes WHERE id=$1', [req.id], (error, results) => {
        if(error){
            next(error);
        }
        else res.status(200).json(results.rows);
    })
})

const deposit = ((req, res, next) => {
    pool.query('UPDATE envelopes SET amount=amount+$1 WHERE id=$2', [req.query.amount, req.id], (error, results) => {
        if(error){
            next(error);
        }
        else res.status(200).send(`Amount added to ${results.rows.name}`);
    })
})

const verifyBalance = ((req, res, next) => {
    //add functionality for transfers

    pool.query('SELECT * FROM envelopes WHERE id=$1 AND amount>=$2', [req.id, req.query.amount], (error, results) => {
        if(error){
            next(error);
        }
        else next();
    })
})

const withdrawAmount = ((req, res, next) => {
    pool.query('UPDATE envelopes SET amount=amount-$1 WHERE id=$2', [req.id, req.query.amount], (error, results) =>{
        if(error){
            next(error);
        }
        else res.status(200).send(`Succesfully withdrew amount, you have ${results.rows.amount} remaining in ${results.rows.name}`)
    })
})

const transferAmount = ((req, res, next) => {
    const transferFrom = req.query.accountFrom;
    const transferTo = req.query.accountTo;

    pool.query('UPDATE envelopes SET amount=amount-$1 WHERE id=$2', [req.query.amount, transferFrom], (error, results) => {
        if(error){
            next(error);
        }
    })
    pool.query('UPDATE envelopes SET amount=amount+$1 WHERE id=$2', [req.query.amount, transferTo], (error, results) => {
        if(error){
            next(error);
        }
        else res.status(200).send('Transfer successfull!');
    })
})





module.exports = { getEnvelopes, getEnvelope, deposit, verifyBalance, withdrawAmount, transferAmount }