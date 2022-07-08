    // Tem Arquivos com Módulos que precisa mudar a Extensão para .mjs !!

    // Usar nodemon + arquivo.js para Atualizar a Página a cada mudança (NÃO da Refresh automaticamente, só é bom para não Reinciiar o server !!)

const http = require('http');
const infoOS = require('./app');

const host = 'http://localhost';
const port = 3000;

http.createServer((req, res) => { 
    const url = req.url;
    if(url  === '/os'){ // O link (localhost, no caso) só Funciona no Endereço especificado (ex. host:porta/os) !!
    res.end(JSON.stringify(infoOS, null, 2)); // Variável a ser mostrada + replace (nesse caso, null) + Espaçamento !!
    }
    else{
        res.end('<h1>Voce esta na Pagina Inicial !</h1>');
    }
}).listen(port, () => console.log(`O servidor está funcionando! Acesse: ${host}:${port}`));