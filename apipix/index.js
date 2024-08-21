require('dotenv').config({ path: "./.env.homologacao" });

const express = require('express')
const cors = require('cors')

const { createPixCharge } = require('./lib/pix.js')

const app = express()

app.use(cors())
app.use(express.json())

app.get('/', ( req, res ) => {
    res.send({ ok: true })   
})

app.post('/NewRequest', async(req, res) => {
    const pixCharge = await createPixCharge(req.body)
    const {qrcode, cobranca} = pixCharge;
    console.log(req.body)
    res.send({ ok: 1, qrcode, cobranca })
})

app.listen(3001, (err) => {
    
    if (err) {
        console.log('Servidor não iniciado.');
        console.log(err)
    } else {
        console.log('Servidor do TrufaShop rodando na porta: 3001');
    }
    
})



