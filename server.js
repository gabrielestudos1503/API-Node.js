const express = require('express');
const axio = require('axios');
const { default: axios } = require('axios');
const cepRegex = /^[0-9]{5}-?[0-9]{3}$/;

const app = express();
const port = 3000;

app.get('/', (req, res) => {
    res.send('Hello world');
});

app.get('/novarota', (req, res) => {
    res.send('Nova rota criada');
});

app.get('/consulta-cep/:cep', async (req, res) => {
    const cep = req.params.cep;
    try {
        if(!cepRegex.test(cep)){
            res.status(400).send('Formato inválido XXXXX-XXX')
        }else{
            const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
            res.json(response.data);
        }
    }catch(error){
        console.error('Erro ao fazer requisição',error);
        res.status(500).send('Erro ao consultar o CEP')
    }
});

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});