const os = require('os');

const { arch, platform, totalmem, freemem, hostname, cpus} = os;

const [{model: myModel}]= cpus();
// const [{times: {sys: teste}}] = cpus();  - Desestruturando uma Propriedade DENTRO de Outra Propriedade !!


setInterval(() =>{
    console.clear();

    const trataTotalRAM = totalmem() / 1024 / 1024;
    const trataFreeRAM = freemem() / 1024 / 1024;
    const usedRAM = (trataFreeRAM / trataTotalRAM) * 100;

    const infoOS = {
        My_Model: myModel,
        Host: hostname(),
        OS: platform(),
        Arch: arch(),
        Total_RAM: `${parseInt(trataTotalRAM)} MB`,
        Free_RAM: `${parseInt(trataFreeRAM)} MB`,
        Used_RAM: `${usedRAM.toFixed(2)} %` // Para mostrar o Máximo de Casas Decimais especificadas (nesse caso, 2) !!
    };
    console.table(infoOS);
    exports.infoOS = infoOS; // exports.Nome(ACHO q pode ser um nome qualquer) = Módulo a ser Exportado 

}, 1000);