const express = require('express');
const axios = require('axios');

const app = express();
const port = 3000;

const rotas = require('./routes')

app.use(express.json());
app.use('/api', rotas)

const PORT = process.env.PORT || 3000;
app.listen(PORT, ()=> console.log(`Servidor rodando na porta ${PORT}`))

app.get('/', (req, res)=>{
    res.send('Hello Word');
})

app.get('/novarota', (req, res)=>{
    res.send('Nova rota criada')
})

app.get('/:cep', async (req, res)=>{
    const cep = req.params.cep;
    const cepRegex = /^[0-9]{5}-?[0-9]{3}$/
    try{
        if(!cepRegex.test(cep)){
            res.status(400).send('Formato errado XXXXX-XXX')
        }else{
            const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
            res.json(response.data);
        }
    }catch (error){
        res.status(500).send('Erro ao consultar o CEP')
    }
});

app.listen(port, ()=>{
    console.log(`Servidor rodando em http://localhost:${port}`);
})