const express = require('express');
const app = express();
const mysql = require('mysql');

const db = mysql.createConnection({
  port: 3366,
  host: 'localhost',
  user: 'root',
  password: 'kenzomaximus',
  database: 'festarit',

});


db.connect(err => {
  console.log(err);
  console.log('Tietokantayhteys luotu');
});

const host = 'localhost';
const port = 3000;

app.get('/', (req, res) => {
  res.send('Tervetuloa palvelimeen!');
});

// Hae kaikki festivaalit
app.get('/festivaalit', (req, res) => {
  db.query('SELECT * FROM Festivaalit', (err, results) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(results);
  });
});

// Hae kaikki artistit
app.get('/artistit', (req, res) => {
  db.query('SELECT * FROM Artistit', (err, results) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(results);
  });
});

// Hae festivaalin kaikki artistit
app.get('/festivaali/:festivaaliID/artistit', (req, res) => {
  const festivaaliID = req.params.festivaaliID;
  db.query('SELECT a.* FROM Artistit a JOIN Keikat k ON a.ArtistiID = k.ArtistiID WHERE k.FestivaaliID = ?', [festivaaliID], (err, results) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(results);
  });
});

// Kaupungit, joissa artisti esiintyy
app.get('/artisti/:artistiID/kaupungit', (req, res) => {
  const artistiID = req.params.artistiID;
  db.query('SELECT DISTINCT k.* FROM Kaupungit k JOIN Keikat ke ON k.KaupunkiID = ke.KaupunkiID WHERE ke.ArtistiID = ?', [artistiID], (err, results) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(results);
  });
});

// Kaupunki, jossa tietty festivaali tapahtuu
app.get('/festivaali/:festivaaliID/kaupunki', (req, res) => {
  const festivaaliID = req.params.festivaaliID;
  db.query('SELECT k.* FROM Kaupungit k JOIN Festivaalit f ON k.KaupunkiID = f.KaupunkiID WHERE f.FestivaaliID = ?', [festivaaliID], (err, results) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(results);
  });
});

// Festivaalit, joissa artisti esiintyy
app.get('/artisti/:artistiID/festivaalit', (req, res) => {
  const artistiID = req.params.artistiID;
  db.query('SELECT DISTINCT f.* FROM Festivaalit f JOIN Keikat ke ON f.FestivaaliID = ke.FestivaaliID WHERE ke.ArtistiID = ?', [artistiID], (err, results) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(results);
  });
});

// Festivaalit, joissa on eniten artisteja
app.get('/festivaalit/artistimaara', (req, res) => {
  db.query('SELECT f.FestivaaliNimi, COUNT(ke.ArtistiID) AS ArtistiMaara FROM Festivaalit f JOIN Keikat ke ON f.FestivaaliID = ke.FestivaaliID GROUP BY f.FestivaaliID ORDER BY ArtistiMaara DESC', (err, results) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(results);
  });
});

// Festivaalien lajittelu ajankohdan mukaan
app.get('/festivaalit/ajankohta', (req, res) => {
  db.query('SELECT * FROM Festivaalit ORDER BY Ajankohta', (err, results) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(results);
  });
});

app.listen(port, host, () => {
  console.log(`Palvelin käynnissä osoitteessa http://${host}:${port}`);
});
