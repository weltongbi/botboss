'use strict';

const lion = require('./lion');
//const {Tablur} = require('tablur');
//const table = new Tablur({
//    border: "round"
//});

//const epicBoss = require('./func/epicBoss');
const raidBoss = require('./func/raidBoss');

(async () => {
    const dados = await new lion();
    //dados.forEach(element => {
        //console.log('"'+element[0]+'",');
    //});

    //const bigBossList = await new epicBoss(dados);
    //console.log(bigBossList);

    const raidBossList = await new raidBoss(dados);
    console.log(raidBossList);

})()