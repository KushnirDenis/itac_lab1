let button = document.querySelector("#calc-btn");
let outputTable = document.querySelector("#output-table");
// https://habr.com/ru/company/lamptest/blog/690638/

button.addEventListener("click", async () => {
    
    // Clear values
    let rowCount = outputTable.rows.length;
    for (let i = 1; i < rowCount; i++) {
        outputTable.deleteRow(1);
    }

    document.querySelector(".characters").innerHTML = 0;
    document.querySelector(".alphabet-power").innerHTML = 0;

    document.querySelector(".information-amount").innerHTML = 0


    let url = document.querySelector("#url").value;

    if (!isValidUrl(url)) {
        alert("Неверная ссылка");
        document.querySelector("#url").focus();
        return;
    }

    /* 
        {
            characters
            alphabetPower
            messageLength
            whoseFormula
            informationAmount
        }
        
        or 

        {
            message,
            status
        }
    */
    let response = await fetch("/getSiteInfo", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            url: url
        })
    })

    let data = await response.json();

    let message = data.message;
    
    if (message != undefined)
    {
        if (data.status === -1)
            alert(`${data.message}`)
        else
            alert(`${data.message} Код ошибки: ${data.status}`)
        return;
    }



    let characters = data.characters;
    drawInfo(outputTable, characters, message);

    document.querySelector(".characters").innerHTML = data.messageLength;
    document.querySelector(".alphabet-power").innerHTML = data.alphabetPower;

    document.querySelector(".information-amount")
        .innerHTML = `${data.informationAmount} по ${data.whoseFormula}`
})


function isValidUrl(str) {
    var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
    '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
    '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
    '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
  return !!pattern.test(str);
}