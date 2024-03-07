const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const router = require('./routes');

const app = express();

const PORT = process.env.PORT || 4001;

app.use(cors());
app.use(bodyParser.json());

app.use('/', router);

app.use((err, req, res, next) => {
    if(!err.status){
        err.status = 501;
    }
    res.status(err.status).send(err.message);
})

app.listen(PORT, () => {
    console.log(`Listening on PORT: ${PORT}`);
});