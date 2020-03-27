const { Tablur } = require('tablur');
const { parse, addHours, format } = require('date-fns');

require('date-fns/locale/pt-BR');

const RaidBossList = [
    ['Kernon', 6],
    ['Core', 48],
    ['Domb Death Cabrio', 6],
    ['Blinding Fire Barakiel', 6],
    ['Golkonda Longhorn', 6],
    ['Zaken', 48],
    ['Queen Ant', 24],
    ['Frintessa', 48],
    ['Orfen', 48],
    ['Baium', 120],
    ['Antharas3', 168],
    ['Valakas', 240],
    ['Hallate The Death Lord', 6]
];

module.exports = class {
    constructor($list) {
        return this.bigBoss($list);
    }

    async bigBoss(list) {

        const table = new Tablur({
            //border: "classic",
            shift: true
        });

        const raidBoss = list.filter((elem) => {
            return RaidBossList.filter(e => e[0] === elem[0]).map(a => a[0] === elem[0])[0];
        }).map(boss => {
            if (boss[1] === 'Dead') {
                const date = parse(boss[2], 'dd/MM/yyyy HH:mm', new Date());
                const time = RaidBossList.filter(e => e[0] === boss[0]).map(a => a[1])[0];

                return [...boss, format(addHours(date, time), 'dd/MM/yyyy HH:mm')];
            }
            return [...boss, 'GOGO VIVO!'];
        });

        const bossIlive = raidBoss.filter((elem, i) => {
            return elem[3] === 'GOGO VIVO!';
        });

        const bossDead = raidBoss.filter((elem, i) => {
            return elem[3] !== 'GOGO VIVO!';
        }).sort((a, b) => {
            var dateA = parse(a[2], 'dd/MM/yyyy HH:mm', new Date());
            var dateB = parse(b[3], 'dd/MM/yyyy HH:mm', new Date());
            return dateA - dateB;
        });

        table.section('Epic Boss', 'center');
        table.row(['Boss', 'Status', 'Dead Since', 'Spawn']);
        table.break();

        [...bossIlive, ...bossDead].forEach((boss) => {
            table.row([boss[0], boss[1], this.color(boss[2], '#fc0107'), this.color(boss[3], '#108040')]);
        });

        return table.toString();
    }
    color(text, color) {
        return '[COLOR=' + color + ']' + text + '[/COLOR]';
    }
};