
var Site = require('../models/site');
var Crawler = require('../services/webcrawler');

var express = require('express');
var router = express.Router();

router.route('/sites')
    .get(function(req,res){
       Site.find(function(err,sites){
            if(err)
                res.send(err);  
            console.log(sites);              
           res.json(sites);
       }).sort({_id:-1});
    })

    .post(function(req,res){
        var site=new Site(req.body);
        site.save(function(err){
            if(err)
                res.send(err);
            res.send({message:'Site Added'});
        });
    });

router.route('/sites/discover/:search')
    .get(function(req,res){
       Crawler.getJson(req.params.search, function(data) {
            var site=new Site(data);
            site.save(function(err){
                if(err)
                    res.send(err);
                console.log('asdd');
                //res.send({message:'Site Added'});
                Site.find(function(err,sites){
                    console.log(sites);
                    if(err)
                        res.send(err);            
                    res.json(sites);
                }).sort({_id:-1});
            });  
        });
        //res.json(site);
    })


router.route('/sites/:id')
    .put(function(req,res){
        Site.findOne({_id:req.params.id},function(err,site){

            if(err)
                res.send(err);

           for(prop in req.body){
                site[prop]=req.body[prop];
           }

            // save the site
            site.save(function(err) {
                if (err)
                    res.send(err);

                res.json({ message: 'Site updated!' });
            });

        });
    })

    .get(function(req,res){
        Site.findOne({_id:req.params.id},function(err, movie) {
            if(err)
                res.send(err);

            res.json(site);
        });
    })

    .delete(function(req,res){
        Site.remove({
            _id: req.params.id
        }, function(err, site) {
            if (err)
                res.send(err);

            res.json({ message: 'Successfully deleted' });
        });
    });

module.exports=router;