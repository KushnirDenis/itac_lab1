const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
const app = express();

app.use(express.static('static')); 
app.use(bodyParser.json())

const PORT = process.env.PORT || 3000;

app.post('/getSiteInfo', async (req, res) => {

  let url = req.body.url;

  let response = await axios.get(url, {timeout: 8000}).catch(error => {})

  if (response === undefined)
  {
    return res.json({
      message: "Сайт недоступен :(\nИли неверный формат ссылки (Напр. https://google.com)",
      status: -1
    });
  }
    

  let statusCode = response.status;

  let message = response.data.toString().toLowerCase();

  if (statusCode != 200)
  {
    return res.json({
      message: "Сайт недоступен :(",
      status: statusCode
  })

  }


  let characters = calc(message);
  let alphabetPower = characters.length;
  let messageLength = message.length;
  let whoseFormula;
  let informationAmount;


  let chance = characters[0].chance;
  let isChancesEqual = true;
  characters.forEach(elem => {
    if (elem.chance != chance)
      isChancesEqual = false;
  })

  if (isChancesEqual) {
    whoseFormula = "Хартли";
    informationAmount = calcInformationAmountHartley(messageLength, alphabetPower);
  } else {
    whoseFormula = "Шеннону";
    informationAmount = calcInformationAmountShannon(characters);
  }


  let result = {
    characters: characters,
    alphabetPower: alphabetPower,
    messageLength: messageLength,
    whoseFormula: whoseFormula,
    informationAmount: informationAmount
  }

  return res.json(result);
})

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
})




// logic.js duplicate

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