var express = require('express');
var router = express.Router();
var request = require('request');
var cookieParser = require('cookie-parser');
var knex = require('knex')(require('../knexfile')['development']);
var snps = 'rs4307059%20rs1800497%20rs53576%20rs10830963%20rs7089424%20rs10484554%20rs2241880%20rs2802292%20rs13266634%20rs2180439%20rs1121980%20rs664143%20rs307377%20rs1815739%20rs807701%20rs17077540%20rs1800955%20rs987525';


/* GET home page. */
router.get('/mental', function(req, res, next) {
  if (req.signedCookies.access_token) {
    var basic_info = {}, ancestry = {}, genotypes = {};
    var base_uri = 'https://api.23andme.com/1';
    var headers = {Authorization: 'Bearer ' + req.signedCookies.access_token};
    request.get({ url: base_uri + '/demo/user/?email=true', headers: headers, json: true }, function (e, r, body) {
      console.log(body);
      basic_info.email = body.email;
      if(r.statusCode != 200) {
        res.clearCookie('access_token');
        res.redirect('/');
      } else {
        knex('users').where({email: basic_info.email})
          .join('snps', 'users.id', 'snps.user_id')
          .then(function(snps){
            console.log(snps);
            basic_info.first_name = snps[0].first_name;
            basic_info.last_name = snps[0].last_name;
            genotypes.rs7089424 = snps[0].rs7089424,
            genotypes.rs53576 = snps[0].rs53576,
            genotypes.rs1800497 = snps[0].rs1800497,
            genotypes.rs17077540 = snps[0].rs17077540,
            genotypes.rs1121980 = snps[0].rs1121980,
            genotypes.rs2241880 = snps[0].rs2241880,
            genotypes.rs13266634 = snps[0].rs13266634,
            genotypes.rs2180439 = snps[0].rs2180439 ,
            genotypes.rs307377 = snps[0].rs307377,
            genotypes.rs807701 = snps[0].rs807701,
            genotypes.rs664143 = snps[0].rs664143,
            genotypes.rs2802292 = snps[0].rs2802292,
            genotypes.rs1800955 = snps[0].rs1800955,
            genotypes.rs4307059 = snps[0].rs4307059,
            genotypes.rs10830963 = snps[0].rs10830963,
              res.render('mental', {
                basic_info: basic_info,
                genotypes: genotypes
              })
          })
        }
      })
    }
  else {
    res.redirect('/');
  }
});

router.get('/physical', function(req, res, next) {
  if (req.signedCookies.access_token) {
    var basic_info = {}, ancestry = {}, genotypes = {};
    var base_uri = 'https://api.23andme.com/1';
    var headers = {Authorization: 'Bearer ' + req.signedCookies.access_token};
    request.get({ url: base_uri + '/demo/user/?email=true', headers: headers, json: true }, function (e, r, body) {
      console.log(body);
      basic_info.email = body.email;
      if(r.statusCode != 200) {
        res.clearCookie('access_token');
        res.redirect('/');
      } else {
        knex('users').where({email: basic_info.email})
          .join('snps', 'users.id', 'snps.user_id')
          .then(function(snps){
            console.log(snps);
            basic_info.first_name = snps[0].first_name;
            basic_info.last_name = snps[0].last_name;
            genotypes.rs7089424 = snps[0].rs7089424,
            genotypes.rs53576 = snps[0].rs53576,
            genotypes.rs1800497 = snps[0].rs1800497,
            genotypes.rs17077540 = snps[0].rs17077540,
            genotypes.rs1121980 = snps[0].rs1121980,
            genotypes.rs2241880 = snps[0].rs2241880,
            genotypes.rs13266634 = snps[0].rs13266634,
            genotypes.rs2180439 = snps[0].rs2180439 ,
            genotypes.rs307377 = snps[0].rs307377,
            genotypes.rs807701 = snps[0].rs807701,
            genotypes.rs664143 = snps[0].rs664143,
            genotypes.rs2802292 = snps[0].rs2802292,
            genotypes.rs1800955 = snps[0].rs1800955,
            genotypes.rs4307059 = snps[0].rs4307059,
            genotypes.rs10830963 = snps[0].rs10830963,
              res.render('physical', {
                basic_info: basic_info,
                genotypes: genotypes
              })
          })
        }
      })
    }
  else {
    res.redirect('/');
  }
});
router.get('/intentions', function(req, res, next) {
  res.render('intentions')
});
router.get('/ancestry', function(req, res, next) {
  if (req.signedCookies.access_token) {
    var basic_info = {}, ancestry = {}, genotypes = {};
    var base_uri = 'https://api.23andme.com/1';
    var headers = {Authorization: 'Bearer ' + req.signedCookies.access_token};
    request.get({ url: base_uri + '/demo/user/?email=true', headers: headers, json: true }, function (e, r, body) {
      console.log(body);
      basic_info.email = body.email;
      if(r.statusCode != 200) {
        res.clearCookie('access_token');
        res.redirect('/');
      } else {
        console.log('IN THE ROUTE');
        knex('users').where({email: basic_info.email})
          .join('ancestry', 'users.id', 'ancestry.user_id')
          .then(function(ancestryData){
            basic_info.first_name = ancestryData[0].first_name;
            basic_info.last_name = ancestryData[0].last_name;
            ancestry.sub_saharan_african = ancestryData[0].sub_saharan_african;
            ancestry.european = ancestryData[0].european;
            ancestry.oceanian = ancestryData[0].oceanian;
            ancestry.east_asian_native_american = ancestryData[0].east_asian_native_american;
            ancestry.south_asian = ancestryData[0].south_asian;
            ancestry.middle_eastern_north_african = ancestryData[0].middle_eastern_north_african;
              res.render('ancestry', {
                basic_info: basic_info,
                ancestry: ancestry
              })
          })
        }
      })
    }
  else {
    res.redirect('/');
  }
});

router.get('/', function(req, res, next) {
  scope = 'rs41362547%20basic%20names%20ancestry%20'+snps;
  if (req.signedCookies.access_token) {
    var basic_info = {}, ancestry = {}, genotypes;
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
          request.get({ url: base_uri + '/demo/user/?email=true', headers: headers, json: true}, function (e, r, body) {
            basic_info.email = body.email;
            request.get({ url: base_uri + '/demo/ancestry/'+basic_info.profile_id, headers: headers, json: true}, function (e, r, body) {
              ancestry.sub_saharan_african = body.ancestry.sub_populations[0].proportion;
              ancestry.european = body.ancestry.sub_populations[1].proportion;
              ancestry.oceanian = body.ancestry.sub_populations[2].proportion;
              ancestry.east_asian_native_american = body.ancestry.sub_populations[3].proportion;
              ancestry.south_asian = body.ancestry.sub_populations[4].proportion;
              ancestry.middle_eastern_north_african = body.ancestry.sub_populations[5].proportion;
              console.log('ancestry at beginning', ancestry);
              request.get({ url: base_uri + '/demo/genotypes/'+basic_info.profile_id+'/?locations='+snps+'&format=true', headers:  headers, json:true}, function (e, r, body) {
              genotypes = body;
              console.log('genotypes at beginning', genotypes);
              return knex('users').where({email:basic_info.email}).then(function(user){
                if(user.length > 0){
                  return knex('users')
                      .join('ancestry', 'users.id', 'ancestry.user_id')
                      .first()
                      .then(function(results){
                        ancestry.sub_saharan_african = results.sub_saharan_african;
                        ancestry.european = results.european;
                        ancestry.oceanian = results.oceanian;
                        ancestry.east_asian_native_american = results.east_asian_native_american;
                        ancestry.south_asian = results.south_asian;
                        ancestry.middle_eastern_north_african = results.middle_eastern_north_african;
                        res.render('ancestry', {
                          ancestry: ancestry,
                          basic_info: basic_info
                          });
                      })
                } else {
                  return knex('users').insert({email: basic_info.email, first_name: basic_info.first_name, last_name:basic_info.last_name})
                        .returning('*')
                        .then(function(user){
                          console.log(user);
                          basic_info.first_name = user[0].first_name;
                          basic_info.last_name = user[0].last_name;
                          basic_info.email = user[0].email;
                          basic_info.profile_id = user[0].id;
                          console.log(basic_info);
                          return knex('snps').insert({
                            rs7089424:genotypes.rs7089424,
                            rs53576: genotypes.rs53576,
                            rs1800497: genotypes.rs1800497,
                            rs17077540: genotypes.rs17077540,
                            rs1121980: genotypes.rs1121980,
                            rs2241880: genotypes.rs2241880,
                            rs13266634: genotypes.rs13266634,
                            rs2180439: genotypes.rs2180439,
                            rs307377: genotypes.rs307377,
                            rs807701: genotypes.rs807701,
                            rs664143: genotypes.rs664143,
                            rs2802292: genotypes.rs2802292,
                            rs1800955: genotypes.rs1800955,
                            rs4307059: genotypes.rs4307059,
                            rs10830963: genotypes.rs10830963,
                            user_id: basic_info.profile_id
                          })
                        .returning('*')
                        .then(function(snps){
                        console.log('genotypes at end', snps[0]);
                        console.log('ancestry in knex call', ancestry);
                        knex('ancestry').insert({
                          sub_saharan_african: ancestry.sub_saharan_african,
                          european: ancestry.european,
                          oceanian: ancestry.oceanian,
                          east_asian_native_american: ancestry.east_asian_native_american,
                          south_asian: ancestry.south_asian,
                          middle_eastern_north_african: ancestry.middle_eastern_north_african,
                          user_id: basic_info.profile_id
                        })
                        .returning('*')
                        .then(function(ancestryData){
                          ancestry = ancestryData[0];
                          res.render('ancestry', {
                            ancestry: ancestry,
                            basic_info: basic_info,
                            genotypes: genotypes
                          });
                        })
                      })
                    })
                  }
                })
              });
            });
          })
        }
      });
    } else {
      var pathway= 'https://api.23andme.com/authorize/?redirect_uri='+process.env.REDIRECT_URI+'&response_type=code&client_id='+ process.env.CLIENT_ID+'&scope='+scope;
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
  scope = 'rs41362547%20basic%20names%20ancestry%20'+snps;
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
