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
let characters = [];

function calc(text) {
    characters = [];
    for (let i = 0; i < text.length; i++) {
        let char = text.charAt(i);
        let savedSymbol = characters.find((elem) => elem.char == char);

        if (savedSymbol == undefined)
            characters.push({ char: char, count: 1, chance: 0 });
        else
            savedSymbol.count++;
    }

    characters.forEach(char => {
        char.chance = calcChance(text, char.count);
    });

    characters.sort((a, b) => a.count < b.count ? 1 : -1);

    return characters;
}

function calcChance(text, amount) {
    return amount / text.length;
}

function calcInformationAmountHartley(msgLength, alphabetPower) {
    return msgLength * Math.log2(alphabetPower);
}

function calcInformationAmountShannon(charactersInfo) {
    let shannonInformationAmount = 0;
    for (let i = 0; i < charactersInfo.length; i++) {
        const char = charactersInfo[i];
        shannonInformationAmount += char.chance * Math.log2(char.chance);
    }
    return -shannonInformationAmount;
}

function drawInfo(outputTable, charactersInfo) {
    let rowCount = outputTable.rows.length;
    for (let i = 1; i < rowCount; i++) {
        outputTable.deleteRow(1);
    }

    charactersInfo.forEach(char => {
        let row = outputTable.insertRow(outputTable.length);
        switch (char.char) {
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