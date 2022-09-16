let input = document.querySelector("#input-text");
let button = document.querySelector("#calc-btn");
let outputTable = document.querySelector("#output-table");

let text = "";

let { log } = console;

/*
    symbols = [
        {
            char: "a", 
            count: 0,
            chance: 0
        },
        ...
    ]
*/
let symbols = [];

button.addEventListener("click", () => {
    text = input.value.toLowerCase();
    symbols = [];
    calc(text);
})

function calc(text) {
    for (let i = 0; i < text.length; i++) {
        let char = text.charAt(i);
        let savedSymbol = symbols.find((elem) => elem.char == char);
        
        if (savedSymbol == undefined)
            symbols.push({char: char, count: 1, chance: 0});
        else
            savedSymbol.count++;
    }

    symbols.forEach(char => {
        char.chance = calcChance(text, char.count);
    });

    symbols.sort((a, b) => a.count < b.count ? 1 : -1);

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

    charactersInfo.forEach(char => {
        let row = outputTable.insertRow(outputTable.length);
        switch(char.char) {
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
                row.insertCell(0).innerHTML = char.char;
                break;
        }
        row.insertCell(1).innerHTML = char.count;
        row.insertCell(2).innerHTML = `<b>${(char.chance * 100).toFixed(2)}%</b>`;
        row.insertCell(3).innerHTML = char.chance;
    });
}