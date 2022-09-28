const express = require('express');
const app = express();

const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.sendFile("static/index.html");
})

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
})