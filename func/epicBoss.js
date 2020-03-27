const { Tablur } = require('tablur');
const { parse, addHours, format, differenceInMinutes } = require('date-fns');

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

                const addtime = format(addHours(date, time), 'dd/MM/yyyy HH:mm');

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

        table.section('Epic Boss', 'center');
        table.row(['Boss', 'Status', 'Dead Since', 'Spawn']);
        table.break();

        [...bossIlive, ...bossDead].forEach((boss) => {
            table.row([boss[0], boss[1], this.color(boss[2], '#fc0107'), this.color(boss[3], '#108040'), this.color(boss[4], '#000066')]);
        });

        return table.toString();
    }
    color(text, color) {
        return  text !== '' ? '[COLOR=' + color + ']' + text + '[/COLOR]' : '';
    }
};