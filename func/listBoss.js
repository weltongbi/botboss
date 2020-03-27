module.exports = json => {
    const boss = [];
    n = 0;
    boss[n] = ['name', 'status', 'data'];
    json.forEach(element => {
        if (element.Name) {
            let status;
            n++
            switch (element.Status) {
                case "Morto":
                case "Dead":
                case "Muerto":
                    status = "Dead"
                    break;
                case "Vivo":
                case "Alive":
                    status = "Alive"
                    break;

            }
            boss[n] = [element.Name, status, element['Defeat date']];
        }
    });
    return boss;
}