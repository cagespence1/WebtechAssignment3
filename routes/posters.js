var express = require('express');
var router = express.Router();

// Proxy for IMDB api
var request = require('request');

router.get('/:imdbId', function (req, res) {

    var imdbId = req.params.imdbId;

    request('http://www.myapifilms.com/imdb/idIMDB?token=26dcf744-e4a9-4e10-b24c-05c101ff4b54&idIMDB=' + imdbId, {json: true}, function (err, result, body) {
        if (err) {
            res.status(400).json({error: 'MyAPIFilms api unavailable'});
            return;
        }
        console.log('body');
        console.log(body);
        if (body.error){
            res.json('unable to load movie');
            return;
        } else {
            res.json(body.data.movies[0].urlPoster);
        }
    });
});

module.exports = router;