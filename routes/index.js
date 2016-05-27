var express = require('express');
var router = express.Router();
var request = require('request');
var cookieParser = require('cookie-parser');
var knex = require('knex')(require('../knexfile')['production']);
var snps = 'email%20rs4307059%20rs1800497%20rs53576%20rs10830963%20rs7089424%20rs10484554%20rs2241880%20rs2802292%20rs13266634%20rs2180439%20rs1121980%20rs664143%20rs307377%20rs1815739%20rs807701%20rs17077540%20rs1800955%20rs987525';


/* GET home page. */
router.get('/logout', function(req,res,next){
  res.clearCookie('access_token');
  res.redirect('/');
})
router.get('/intentions', function(req,res,next){
  if (req.signedCookies.access_token) {
    var basic_info = {}, intentions={}, chartData = {};
    var base_uri = 'https://api.23andme.com/1';
    var headers = {Authorization: 'Bearer ' + req.signedCookies.access_token};
    request.get({ url: base_uri + '/user/?email=true', headers: headers, json: true }, function (e, r, body) {
      basic_info.email = body.email;
      if(r.statusCode != 200) {
        res.clearCookie('access_token');
        res.redirect('/');
      } else {
        knex('users').where({email: basic_info.email})
          .join('intentions', 'users.id', 'intentions.user_id')
          .orderBy('create', 'desc')
          .then(function(intentions){
            console.log(intentions.length);
            if(intentions.length == 0){
              console.log('IN HERE');
              res.render('intentions', {
                message: 'You haven\'t added any intentions!',
                display: 'none'
              })
            } else{
            var intentions = intentions;

              Promise.all([
                knex('intentions').where({user_id: intentions[0].user_id})
                .count('create'),
                knex('intentions').where({user_id: intentions[0].user_id})
                .count('start'),
                knex('intentions').where({user_id: intentions[0].user_id})
                .count('end')
              ])
              .then(function(data){
                chartData.created = data[0][0].count;
                chartData.started = data[1][0].count;
                chartData.completed = data[2][0].count;
                res.render('intentions', {
                  intentions: intentions,
                  chartData: chartData
                })
              })
              .catch(function(err){
                next(err);
              })
            }
          })
        }
      })
    }
  else {
    res.redirect('/');
  }

})
router.post('/list/add', function(req,res,next){
  knex('intentions').insert({description: req.body.intention, create: req.body.create, user_id:req.body.user_id, createFormatted: req.body.createFormatted})
    .then(function(intention){
      res.end('{"success" : "Updated Successfully", "status" : 200}');
    })
})
router.post('/list/start', function(req,res,next){
  knex('intentions').where({description: req.body.intention}).update({start: req.body.start, startFormatted: req.body.startFormatted})
    .returning('*')
    .then(function(intention){
      res.end('{"success" : "Updated Successfully", "status" : 200}');
    })
})

router.post('/list/complete', function(req,res,next){
  knex('intentions').where({description: req.body.intention}).update({end: req.body.end, endFormatted: req.body.endFormatted})
    .returning('*')
    .then(function(intention){
      res.end('{"success" : "Updated Successfully", "status" : 200}');
    })
})
router.get('/mental', function(req, res, next) {
  if (req.signedCookies.access_token) {
    var basic_info = {}, ancestry = {}, genotypes = {};
    genotypes.rs53576 = {};
    genotypes.rs1800497 = {};
    genotypes.rs17077540 = {};
    genotypes.rs807701 = {};
    genotypes.rs1800955 = {};
    genotypes.rs4307059 = {};
    var base_uri = 'https://api.23andme.com/1';
    var headers = {Authorization: 'Bearer ' + req.signedCookies.access_token};
    request.get({ url: base_uri + '/user/?email=true', headers: headers, json: true }, function (e, r, body) {
      basic_info.email = body.email;
      if(r.statusCode != 200) {
        res.clearCookie('access_token');
        res.redirect('/');
      } else {
        knex('users').where({email: basic_info.email})
          .join('snps', 'users.id', 'snps.user_id')
          .then(function(snps){
            genotypes.rs53576.value = snps[0].rs53576,
            genotypes.rs1800497.value = snps[0].rs1800497,
            genotypes.rs17077540.value = snps[0].rs17077540,
            genotypes.rs807701.value = snps[0].rs807701,
            genotypes.rs1800955.value = snps[0].rs1800955,
            genotypes.rs4307059.value = snps[0].rs4307059
            basic_info.profile_id = snps[0].id;
            return knex('snp_info').then(function(snpInfo){
              genotypes.rs53576.info = snpInfo[1];
              genotypes.rs1800497.info = snpInfo[2];
              genotypes.rs17077540.info = snpInfo[3];
              genotypes.rs807701.info = snpInfo[9];
              genotypes.rs1800955.info = snpInfo[12];
              genotypes.rs4307059.info = snpInfo[13];
              console.log(genotypes);
              res.render('mental', {
                basic_info: basic_info,
                genotypes: genotypes
              })
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
    genotypes.rs7089424 = {};
    genotypes.rs1121980 = {};
    genotypes.rs2241880 = {};
    genotypes.rs13266634 = {};
    genotypes.rs2180439 = {};
    genotypes.rs307377 = {};
    genotypes.rs664143 = {};
    genotypes.rs2802292 = {};
    genotypes.rs10830963 = {};
    var base_uri = 'https://api.23andme.com/1';
    var headers = {Authorization: 'Bearer ' + req.signedCookies.access_token};
    request.get({ url: base_uri + '/user/?email=true', headers: headers, json: true }, function (e, r, body) {
      basic_info.email = body.email;
      if(r.statusCode != 200) {
        res.clearCookie('access_token');
        res.redirect('/');
      } else {
        return knex('users').where({email: basic_info.email})
          .join('snps', 'users.id', 'snps.user_id')
          .then(function(snps){
            basic_info.first_name = snps[0].first_name;
            basic_info.last_name = snps[0].last_name;
            genotypes.rs7089424.value = snps[0].rs7089424;
            genotypes.rs1121980.value = snps[0].rs1121980;
            genotypes.rs2241880.value = snps[0].rs2241880;
            genotypes.rs13266634.value = snps[0].rs13266634;
            genotypes.rs2180439.value = snps[0].rs2180439 ;
            genotypes.rs307377.value = snps[0].rs307377;
            genotypes.rs664143.value = snps[0].rs664143;
            genotypes.rs2802292.value = snps[0].rs2802292;
            genotypes.rs10830963.value = snps[0].rs10830963;
            basic_info.profile_id = snps[0].id;

            return knex('snp_info').then(function(snpInfo){
              genotypes.rs7089424.info = snpInfo[0];
              genotypes.rs1121980.info = snpInfo[4];
              genotypes.rs2241880.info = snpInfo[5];
              genotypes.rs13266634.info = snpInfo[6];
              genotypes.rs2180439.info = snpInfo[7];
              genotypes.rs307377.info = snpInfo[8];
              genotypes.rs664143.info = snpInfo[10];
              genotypes.rs2802292.info = snpInfo[11];
              genotypes.rs10830963.info = snpInfo[14];
              res.render('physical', {
                basic_info: basic_info,
                genotypes: genotypes
              })
            })
          })
        }
      })
    }
  else {
    res.redirect('/');
  }
});
router.get('/ancestry', function(req, res, next) {
  if (req.signedCookies.access_token) {
    var basic_info = {}, ancestry = {}, ancestry_info = {};
    var base_uri = 'https://api.23andme.com/1';
    var headers = {Authorization: 'Bearer ' + req.signedCookies.access_token};
    request.get({ url: base_uri + '/user/?email=true', headers: headers, json: true }, function (e, r, body) {
      console.log(body);
      basic_info.email = body.email;
      if(r.statusCode != 200) {
        res.clearCookie('access_token');
        res.redirect('/');
      } else {
        console.log(basic_info);
        knex('users').where({email: basic_info.email})
          .join('ancestry', 'users.id', 'ancestry.user_id')
          .then(function(ancestryData){
            console.log('ancestrydata', ancestryData);
            basic_info.first_name = ancestryData[0].first_name;
            basic_info.last_name = ancestryData[0].last_name;
            ancestry.sub_saharan_african = ancestryData[0].sub_saharan_african;
            ancestry.european = ancestryData[0].european;
            ancestry.oceanian = ancestryData[0].oceanian;
            ancestry.east_asian_native_american = ancestryData[0].east_asian_native_american;
            ancestry.south_asian = ancestryData[0].south_asian;
            ancestry.middle_eastern_north_african = ancestryData[0].middle_eastern_north_african;
            basic_info.profile_id = snps[0].id;

            knex('ancestry_info').select('*').then(function(ancestryInfo){
              ancestry_info= ancestryInfo;
              res.render('ancestry', {
                basic_info: basic_info,
                ancestry: ancestry,
                ancestry_info: ancestry_info
              })
            })
          })
          .catch(function(err){
            next(err);
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
    request.get({ url: base_uri + '/names/', headers: headers, json: true }, function (e, r, body) {
      if(r.statusCode != 200) {
        res.clearCookie('access_token');
        res.redirect('/');
      } else {
          basic_info.first_name = body.first_name;
          basic_info.last_name = body.last_name;
          basic_info.profile_id = body.profiles[0].id;
          request.get({ url: base_uri + '/user/?email=true', headers: headers, json: true}, function (e, r, body) {
            basic_info.email = body.email;
            request.get({ url: base_uri + '/ancestry/'+basic_info.profile_id, headers: headers, json: true}, function (e, r, body) {
              console.log('ancestry in /', body.ancestry.sub_populations)
              for (var i = 0; i < body.ancestry.sub_populations.length; i++) {
                if(body.ancestry.sub_populations[i].label == 'European'){
                  ancestry.european = body.ancestry.sub_populations[i].proportion;
                } else if (body.ancestry.sub_populations[i].label == 'East Asian & Native American') {
                  ancestry.east_asian_native_american = body.ancestry.sub_populations[i].proportion;
                } else if (body.ancestry.sub_populations[i].label == 'Sub-Saharan African') {
                  ancestry.sub_saharan_african = body.ancestry.sub_populations[i].proportion;
                } else if (body.ancestry.sub_populations[i].label == 'Oceanian') {
                  ancestry.oceanian = body.ancestry.sub_populations[i].proportion;
                } else if (body.ancestry.sub_populations[i].label == 'South Asian') {
                  ancestry.south_asian = body.ancestry.sub_populations[4].proportion;
                } else if (body.ancestry.sub_populations[i].label == 'Middle Eastern & North African') {
                  ancestry.middle_eastern_north_african = body.ancestry.sub_populations[i].proportion;
                }
              }
              request.get({ url: base_uri + '/genotypes/'+basic_info.profile_id+'/?locations='+snps+'&format=true', headers:  headers, json:true}, function (e, r, body) {
              genotypes = body;
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
                        res.redirect('/ancestry');
                      })
                } else {
                  return knex('users').insert({email: basic_info.email, first_name: basic_info.first_name, last_name:basic_info.last_name})
                        .returning('*')
                        .then(function(user){
                          basic_info.first_name = user[0].first_name;
                          basic_info.last_name = user[0].last_name;
                          basic_info.email = user[0].email;
                          basic_info.profile_id = user[0].id;
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
                          res.redirect('/ancestry');
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
