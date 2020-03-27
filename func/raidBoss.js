const { Tablur } = require('tablur');
const { parse, addHours, format, differenceInMinutes } = require('date-fns');

require('date-fns/locale/pt-BR');

const raidBossList = require('./raidBossList');

module.exports = class {
    constructor($list, lvl = 0) {
        return this.raidBoss($list, lvl);
    }

    async raidBoss(list, lvl) {

        const BossList = (process.env.BOT_TS3_RAIDBOSSLIST || raidBossList)[lvl];

        const table = new Tablur({
            //border: "classic",
            shift: true
        });

        const raidBoss = list.filter((elem) => {
            return BossList.filter(e => e === elem[0]).map(a => true)[0];
        }).map(boss => {
            if (boss[1] === 'Dead') {

                const date = parse(boss[2], 'dd/MM/yyyy HH:mm', new Date());
                const addtime = format(addHours(date, 12), 'dd/MM/yyyy HH:mm');

                return [...boss, addtime, "---> " + differenceInMinutes(parse(addtime, 'dd/MM/yyyy HH:mm', new Date()), new Date())];
            }
            return [...boss, 'GOGO VIVO!', ''];
        });

        const bossIlive = raidBoss.filter((elem, i) => {
            return elem[3] === 'GOGO VIVO!';
        });

        const bossDead = raidBoss.filter((elem, i) => {
            return elem[3] !== 'GOGO VIVO!';
        }).sort((a, b) => {
            var dateA = parse(a[3], 'dd/MM/yyyy HH:mm', new Date());
            var dateB = parse(b[3], 'dd/MM/yyyy HH:mm', new Date());
            if (dateA < dateB) return -1;
            if (dateA > dateB) return 1;
            return 0;
        });

        table.section('Raid Boss', 'center');
        table.row(['Boss', 'Status', 'Dead Since', 'Spawn', 'time left']);
        table.break();

        [...bossIlive, ...bossDead].forEach((boss) => {
            table.row([boss[0], boss[1], this.color(boss[2], '#fc0107'), this.color(boss[3], '#108040'), this.color(boss[4], '#000066')]);
        });

        return table.toString();
    }
    color(text, color) {
        return text !== '' ? '[COLOR=' + color + ']' + text + '[/COLOR]' : '';
    }
};