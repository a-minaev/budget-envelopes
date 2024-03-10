const { pool } = require('config');


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
    
})