let input = document.querySelector("#input-text");
let button = document.querySelector("#calc-btn");
let outputTable = document.querySelector("#output-table");

let text = "";

let { log } = console;

/*
    symbols = {
        "a": {
            "count": value,
            "chance": value
        },
        "b": {
            "count": value,
            "chance": value
        },
        ...
    }
*/
let symbols = {};

button.addEventListener("click", () => {
    text = input.value.toLowerCase();
    symbols = {};
    calc(text);
})

function calc(text) {
    for (let i = 0; i < text.length; i++) {
        let char = text.charAt(i);

        if (!(char in symbols)) {
            symbols[char] = {
                "count": 1,
                "chance": 0
            }
        } else {
            symbols[char]["count"]++;
        }
    }

    Object.keys(symbols).forEach(key => {
        let char = symbols[key];
        char["chance"] = calcChance(text, char["count"])
    });

    drawInfo(outputTable, symbols);
}

function calcChance(text, amount) {
    return amount / text.length;
}


function drawInfo(outputTable, charactersInfo) {
    let rowCount = outputTable.rows.length;
    for (let i = 1; i < rowCount; i++) {
        outputTable.deleteRow(1);
    }

    Object.keys(charactersInfo).forEach(key => {
        let char = symbols[key];
        let row = outputTable.insertRow(outputTable.length);
        switch(key) {
            case "\n":
                row.insertCell(0).innerHTML = "перевод строки";
                break;
            case " ":
                row.insertCell(0).innerHTML = "пробел";
                break;
            case "\t":
                row.insertCell(0).innerHTML = "табуляция";
                break;
            default:
                row.insertCell(0).innerHTML = key;
                break;
        }
            // row.insertCell(0).innerHTML = key == "\n" ? "\\n" : key;
        row.insertCell(1).innerHTML = char.count;
        row.insertCell(2).innerHTML = char.chance.toFixed(4);
    });
}