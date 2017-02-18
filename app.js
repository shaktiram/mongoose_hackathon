const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Playlist = require('./playlist');

const port = 8080;
const db = 'mongodb://localhost/playlists';

mongoose.connect(db);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.get('/', (req, res) =>
  res.send('happy to be here'));

app.get('/playlists', (req, res) => {
  console.log('getting all movies');
  Playlist.find({})
    .exec((err, movies) => {
      if(err) {
        res.send('error occured')
      } else {
        console.log(movies);
        res.json(movies);
    }
 })
});

app.get('/playlists/:genre', (req, res) =>
 // console.log('getting all books');
  Playlist.findOne({
    genre: req.params.genre
    })
    .exec((err, movies) => {
      if(err) {
        res.send('error occured')
      } else {
        console.log(movies);
        res.json(movies);
    }
}));

app.post('/playlist', (req, res) => {
  let newPlaylist = new Playlist();

  newPlaylist.title = req.body.title;
  newPlaylist.actor = req.body.actor;
  newPlaylist.genre = req.body.genre;

  newPlaylist.save((err, movie) => {
    if(err) {
      res.send('error saving book');
    } else {
      console.log(movie);
      res.send(movie);
    }
  })
});

app.post('/playlist2', (req, res) =>
  Playlist.create(req.body, (err, movie) => {
    if(err) {
      res.send('error saving movie');
    } else {
      console.log(movie);
      res.send(movie);
  }
}));

app.patch('/playlist/:genre', (req, res) =>
  Playlist.findOneAndUpdate({
    genre: req.params.genre
    },
    { $set: { title: req.body.title }
  }, {upsert: true}, (err, newPlaylist) => {
    if (err) {
      res.send('error updating ');
    } else {
      console.log(newPlaylist);
      res.send(newPlaylist);
  }
}));

app.delete('/playlist/:genre', (req, res) =>
  Playlist.findOneAndRemove({
    genre: req.params.genre
  }, (err, movie) => {
    if(err) {
      res.send('error removing')
    } else {
      console.log(movie);
      res.status(204);
  }
}));

app.listen(port, () =>
  console.log('app listening on port ' + port));
