const express = require('express');
const app = express();
const port = 3000;

// Роут для главной страницы
app.get('/', (req, res) => {
  res.send('Hello World with Express!');
});

// Роут для страницы about
app.get('/about', (req, res) => {
  res.send('About page');
});

// Запуск сервера
app.listen(port, () => {
  console.log(`Express server running at http://localhost:${port}`);
});