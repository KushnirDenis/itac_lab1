let inputText1 = document.querySelector("#input-text-1");
let inputText2 = document.querySelector("#input-text-2");
let compareButton = document.querySelector("#compare-texts-btn");
let outputTable1 = document.querySelector("#output-table-1");
let outputTable2 = document.querySelector("#output-table-2");

let text1 = "";
let text2 = "";

compareButton.addEventListener("click", () => {
    text1 = inputText1.value;
    text2 = inputText2.value;
    let chars1 = calc(text1);
    let chars2 = calc(text2);

    let alphabetPower1 = chars1.length;

    let charsAmount = document.querySelector(".characters-1").innerHTML = text1.length;
    document.querySelector(".alphabet-power-1").innerHTML = alphabetPower1;

    document.querySelector(".hartley-information-amount-1")
    .innerHTML = calcInformationAmountHartley(text1.length, alphabetPower1);

    document.querySelector(".shannon-information-amount-1")
    .innerHTML = calcInformationAmountShannon(chars1);

    let alphabetPower2 = chars2.length;

    document.querySelector(".characters-2").innerHTML = text2.length;
    document.querySelector(".alphabet-power-2").innerHTML = alphabetPower2;

    document.querySelector(".hartley-information-amount-2")
    .innerHTML = calcInformationAmountHartley(text2.length, alphabetPower2);

    document.querySelector(".shannon-information-amount-2")
    .innerHTML = calcInformationAmountShannon(chars2);


    drawInfo(outputTable1, chars1);
    drawInfo(outputTable2, chars2);
    
})