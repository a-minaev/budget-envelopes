const pool = require('./config');


const getEnvelopes =  ((req, res, next) => {
    console.log('invoking getEnvelopes');
    pool.query("SELECT * FROM public.envelopes", (error, results)=>{
        if(error){
            console.log('error in query');
            next(error);
        }

        else {
            console.log('error in response');
            res.status(200).json(results.rows).send();
        }
    })
})

const getEnvelope = ((req, res, next) => {
    pool.query('SELECT * FROM envelopes WHERE id=$1', [req.id], (error, results) => {
        if(error){
            next(error);
        }
        else res.status(200).json(results
            .rows);
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
    console.log(`verifyBalance is executing with req.id:${req.id}`)
    if(req.id){
        pool.query('SELECT * FROM envelopes WHERE id=$1 AND amount>=$2', [req.id, req.query.amount], (error, results) => {
            if(error){
                next(error);
            }
            else{
                console.log('succsesfully verified balance');
                next()
            };
        })
    } else{
        pool.query('SELECT * FROM envelopes WHERE id=$1 AND amount>=$2', [req.query.accountFrom, req.query.amount], (error, results) => {
            if(error){
                next(error);
            }
            else next();
        })
    }
})

const withdrawAmount = ((req, res, next) => {
    pool.query('UPDATE envelopes SET amount=(amount-$2) WHERE id=$1', [req.id, req.query.amount], (error, results) =>{
        if(error){
            next(error);
        }
        else res.status(200).send(`Succesfully withdrew amount, you have ${results.rows.amount} remaining in ${results.rows.name}`)
    })
})

const transferAmount = ((req, res, next) => {
    const transferFrom = req.query.accountFrom;
    const transferTo = req.query.accountTo;

    pool.query('UPDATE envelopes SET amount=(amount-$1) WHERE id=$2', [req.query.amount, transferFrom], (error, results) => {
        if(error){
            next(error);
        }
    })
    pool.query('UPDATE envelopes SET amount=(amount+$1) WHERE id=$2', [req.query.amount, transferTo], (error, results) => {
        if(error){
            next(error);
        }
        else res.status(200).send('Transfer successfull!');
    })
})





module.exports = { getEnvelopes, getEnvelope, deposit, verifyBalance, withdrawAmount, transferAmount }