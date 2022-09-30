let input = document.querySelector("#input-text");
let button = document.querySelector("#calc-btn");
let outputTable = document.querySelector("#output-table");

button.addEventListener("click", () => {
    text = input.value.toLowerCase();
    let characters = calc(text);
    drawInfo(outputTable, characters, text);

    let alphabetPower = characters.length;

    document.querySelector(".characters").innerHTML = text.length;
    document.querySelector(".alphabet-power").innerHTML = alphabetPower;

    let chance = characters[0].chance;
    let isChancesEqual = true;
    characters.forEach(elem => {
        if (elem.chance != chance)
            isChancesEqual = false;
    })

    document.querySelector(".information-amount")
    .innerHTML = isChancesEqual ? 
            calcInformationAmountHartley(text.length, alphabetPower) + " (по Хартли)" :
            calcInformationAmountShannon(characters, text.length) + " (по Шеннону)";
})