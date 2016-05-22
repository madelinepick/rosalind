var express = require('express');
var router = express.Router();
var request = require('request');
var cookieParser = require('cookie-parser');

/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

router.get('/', function(req, res, next) {
  scope = 'rs2854464%20basic%20names';
  if (req.signedCookies.access_token) {
        var names, names_by_id = {}, genotypes;
        var base_uri = 'https://api.23andme.com/1';
        var headers = {Authorization: 'Bearer ' + req.signedCookies.access_token};
        request.get({ url: base_uri + '/names/', headers: headers, json: true }, function (e, r, body) {
            if(r.statusCode != 200) {
                res.clearCookie('access_token');
                res.redirect('/');
            } else {
                names = body;
                request.get({ url: base_uri + '/demo/user', headers: headers, json: true}, function (e, r, body) {
                    console.log(body);
                    console.log(names);
                    genotypes = body;
                    res.render('result', {
                        names: names,
                        genotypes: genotypes
                    });
                });
            }
        });
    } else {
      var pathway= 'https://api.23andme.com/authorize/?redirect_uri='+process.env.REDIRECT_URI+'&response_type=code&client_id='+ process.env.CLIENT_ID+'&scope='+scope;
      console.log(pathway);
        res.render('index', {
            pathway: pathway,
            client_id: process.env.CLIENT_ID,
            scope: scope,
            redirect_uri: process.env.REDIRECT_URI,
            title: 'Rosalind'
        });
    }
});
router.get('/receive_code/', function(req, res, next) {
  scope = 'rs2854464%20basic%20names';
  if (!req.query.code) {
      res.render('error', {
          client_id: process.env.CLIENT_ID,
          scope: scope,
          redirect_uri: process.env.REDIRECT_URI
      });
  } else {
      // Exchange the code for a token,
      // store it in the session, and redirect.
      request.post({
          url: 'https://api.23andme.com/token/',
          form: {
              client_id: process.env.CLIENT_ID,
              client_secret: process.env.CLIENT_SECRET,
              grant_type: 'authorization_code',
              code: req.query.code,
              redirect_uri: process.env.REDIRECT_URI,
              scope: scope
          },
          json: true }, function(e, r, body) {
              if (!e && r.statusCode == 200) {
                  res.cookie('access_token', body.access_token, {signed: true});
                  res.redirect('/');
              } else {
                  res.send(body);
              }
          });
  }
});

module.exports = router;
