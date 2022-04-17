const fs = require("fs");

function append() {
    for (let page = 1; page < 226; page++) {
        fs.readFile(`newJsons/pageJson${page}.json`, 'utf8', (err, data) => {
            if (err) {
                console.error(err)
                return
            }
            fs.appendFile(`mainJson.json`, data, (err) => {
                if (err)
                    console.log(err);
                else {
                    console.log(`Main File written successfully ${page}/225\n`);
                }
            });
        })
    }
};

function update() {
    fs.readFile('mainJson.json', 'utf8', (err, data) => {
        if (err) {
            console.error(err)
            return
        }
        fs.writeFile('mainJson.json', data.replaceAll("][", ","), (err) => {
            if (err)
                console.log(err);
            else {
                console.log(`Main File updated successfully.\n`);
            }
        })
    })
}

append();
update();