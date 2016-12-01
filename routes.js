
const express = require('express');
const router = express.Router();
const pgp = require('pg-promise')();
const xss = require('xss');
const axios = require('axios');

const DATABASE = process.env.DATABASE_URL  || 'postgres://:@localhost/vefforritun';
const db = pgp(DATABASE);

//Index
router.get('/', (req, res) => {
  db.any(`SELECT * FROM entries ORDER BY entry_date DESC LIMIT 10`)
    .then(data => {
      res.render('index', {data: data});
    })
    .catch(error => {
      res.send(`<p>Gat ekki sótt gögn: ${error}</p>`);
    });
});

router.get('/games', (req, res) => {
  leikir()
    .then((result) => {
      res.render('games', { title: 'Leikir', leikir: result.data.results});
    })
    .catch((error) => {
      res.send(`<p>Gat ekki bætt gögnum við: ${error}</p>`);
    });
  });

function leikir()  {
  const instance = axios.create({ baseURL: 'https://apis.is'});
  return instance.get('/sports/football');
}

router.get('/news', (req, res) => {
  db.any(`SELECT * FROM entries ORDER BY entry_date DESC LIMIT 50`)
    .then(data => {
      res.render('news', {data: data});
    })
    .catch(error => {
      res.send(`<p>Gat ekki sótt gögn: ${error}</p>`);
    });
});

//Creating a new topic
router.get('/newTopic', (req, res) => {
  res.render('newTopic');
});

router.post('/newTopic', (req, res) => {
  const name = xss(req.body.name || '');
  const data = xss(req.body.data || '');
  const topic_name = xss(req.body.topic_name || '');

  db.none(`INSERT INTO entries (entry_name, entry_topic_name, entry_data) VALUES ($1, $2, $3)`, [name, topic_name, data])
    .then(data => {
      res.redirect('news');
    })
    .catch(error => {
      res.send(`<p>Gat ekki bætt gögnum við: ${error}</p>`);
    });
})


module.exports = router;
