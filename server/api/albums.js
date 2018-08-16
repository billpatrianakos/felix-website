// Albums endpoint
// ===============

const express           = require('express');
const AlbumsController  = express.Router();
const Album             = require(__dirname + '/../models/album');
const jwtMW             = require(__dirname + '/../lib/jwt-middleware');

const Promise = require('bluebird'); // TODO: test if we can remove this with Node 10+

AlbumsController.route('/?')
  // GET /api/albums/
  // ----------------
  // Fetch all album records
  .get((req, res, next) => {
    new Album().fetchAll({ withRelated: ['tracklist'] })
      .then((albums) => {
        res.json({
          error: false,
          albums: albums.toJSON()
        });
      })
      .catch(err => {
        res.json({
          error: true,
          message: err
        });
      });
  })
  // POST /api/albums/
  // -----------------
  // Create a new album record
  .post(jwtMW, (req, res, next) => {
    new Album({
      title: req.body.title,
      release_date: req.body.release_date,
      description: req.body.description,
      cover_art: req.body.cover_art,
      itunes_url: req.body.itunes_url,
      bandcamp_url: req.body.bandcamp_url,
      apple_music_url: req.body.apple_music_url,
      spotify_url: req.body.spotify_url,
      type: req.body.type
    })
    .save()
    .tap(album => {
      Promise.map(req.body.tracklist, (track) => album.related('tracklist').create(track));
    })
    .then(album => {
      res.json({ error: false, album: album.toJSON() });
    })
    .catch(err => {
      res.json({ error: true, message: err });
    });
  });

AlbumsController.route('/:id/?')
  // GET /api/albums/id/
  // -------------------
  // Get details of existing album
  .get((req, res, next) => {
    new Album({ id: req.params.id })
      .fetch({ require: true, withRelated: 'tracklist' })
      .then(album => {
        res.json({ error: false, album: album.toJSON() });
      })
      .catch(err => {
        res.json({ error: true, message: 'Album not found' });
      });
  })
  // PATCH /api/albums/:id/
  // ----------------------
  // Update an existing album
  .patch(jwtMW, (req, res, next) => {
    new Album({ id: req.params.id })
      .fetch({ require: true })
      .then(album => {
        album.set(req.body);
        return album.save();
      })
      .then(album => {
        res.json({ error: false, album: album.toJSON() });
      })
      .catch(err => {
        res.json({ error: true, message: err });
      });
  })

module.exports = AlbumsController;
