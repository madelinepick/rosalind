var express = require('express');
var router = express.Router();
var request = require('request');
var cookieParser = require('cookie-parser');

/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

router.get('/', function(req, res, next) {
  scope = 'rs41362547%20basic%20names%20ancestry';
  if (req.signedCookies.access_token) {
        var basic_info = {}, ancestry;
        var base_uri = 'https://api.23andme.com/1';
        var headers = {Authorization: 'Bearer ' + req.signedCookies.access_token};
        request.get({ url: base_uri + '/demo/names/', headers: headers, json: true }, function (e, r, body) {
            if(r.statusCode != 200) {
                res.clearCookie('access_token');
                res.redirect('/');
            } else {
                basic_info.first_name = body.first_name;
                basic_info.last_name = body.last_name;
                basic_info.profile_id = body.profiles[0].id;
                request.get({ url: base_uri + '/demo/ancestry/'+basic_info.profile_id, headers: headers, json: true}, function (e, r, body) {
                  if(r.statusCode != 200) {
                      res.clearCookie('access_token');
                      res.redirect('/');
                  } else {
                    ancestry = body.ancestry.sub_populations;
                    request.get({ url: base_uri + '/demo/ancestry/'+basic_info.profile_id, headers: headers, json: true}, function (e, r, body) {
                      res.render('result', {
                          ancestry: ancestry,
                          basic_info: basic_info
                      });
                    });
                  }
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
  scope = 'rs41362547%20basic%20names%20ancestry';
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
