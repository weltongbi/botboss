'use strict';
const https = require('https');
const cheerio = require('cheerio');
const tabletojson = require('tabletojson');
//Modulos internos.

const listBoss = require('./func/listBoss');

module.exports = class {
    constructor() {
        return this.boss();
    }

    async boss() {
        return new Promise((res, rej) => {
            try {
                https.get('https://l2lion.com/?page=boss', async (resp) => {
                    let data = '';                   
                    let _epicBoss;
                    let _raidBoss;

                    resp.on('data', (chunk) => {
                        data += chunk;
                    });

                    resp.on('end', async () => {
                        const Data = cheerio.load(data);
                        await Data('table.default').each(async (i, elem) => {
                            if (i == 0) {
                                _epicBoss = tabletojson.convert(elem);
                            }
                            if (i == 1) {
                                _raidBoss = tabletojson.convert(elem);
                            }
                        });
                        res(listBoss([..._epicBoss[0], ..._raidBoss[0]]));
                    });

                }).on("error", (err) => {
                    console.log("Error: " + err.message);
                    rej("Error: " + err.message)

                });
            } catch (e) {
                rej(e)
            }
        });
    }
}



