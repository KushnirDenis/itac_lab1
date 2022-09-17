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

    document.querySelector(".hartley-information-amount")
    .innerHTML = calcInformationAmountHartley(text.length, alphabetPower);

    document.querySelector(".shannon-information-amount")
    .innerHTML = calcInformationAmountShannon(characters);
})