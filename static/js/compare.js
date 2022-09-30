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

    document.querySelector(".characters-1").innerHTML = text1.length;
    document.querySelector(".alphabet-power-1").innerHTML = alphabetPower1;

    let chance = chars1[0].chance;
    let isChancesEqual = true;
    chars1.forEach(elem => {
        if (elem.chance != chance)
            isChancesEqual = false;
    })

    document.querySelector(".information-amount-1")
    .innerHTML = isChancesEqual ? 
            calcInformationAmountHartley(text1.length, alphabetPower1) + " (по Хартли)" :
            calcInformationAmountShannon(chars1, text1.length) + " (по Шеннону)";


    let alphabetPower2 = chars2.length;

    document.querySelector(".characters-2").innerHTML = text2.length;
    document.querySelector(".alphabet-power-2").innerHTML = alphabetPower2;

    chance = chars2[0].chance;
    isChancesEqual = true;
    chars2.forEach(elem => {
        if (elem.chance != chance)
            isChancesEqual = false;
    })

    document.querySelector(".information-amount-2")
    .innerHTML = isChancesEqual ? 
            calcInformationAmountHartley(text2.length, alphabetPower2) + " (по Хартли)" :
            calcInformationAmountShannon(chars2, text2.length) + " (по Шеннону)";


    drawInfo(outputTable1, chars1);
    drawInfo(outputTable2, chars2);
    
})