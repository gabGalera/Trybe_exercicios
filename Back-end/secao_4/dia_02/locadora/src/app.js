const express = require('express');
const { readJSON, writeJSON } = require('./utils/fsUtils');

const app = express();

app.use(express.json());

app.get('/movies', async (req, res) => {
  try {
    const data = await readJSON();
    res.status(200).json(data);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
});

app.get('/movies/:id', async (req, res) => {
  try {
    const data = await readJSON();
    const movies = data.find((movie) => movie.id === Number(req.params.id));
    res.status(200).json(movies);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
});

app.post('/movies', async (req, res) => {
  try {
    const data = await readJSON();
    await writeJSON({ id: data.length + 1, ...req.body });
    res.status(200).json(req.body);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
});

app.put('/movies/:id', async (req, res) => {
  try {
    const id = Number(req.params.id);
    const { movie, price } = req.body;
    const data = await readJSON();
    const index = data.findIndex((element) => element.id === id);
    data[index] = { id, movie, price };
    await writeJSON(data);
    res.status(200).json(data);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
});

module.exports = app;