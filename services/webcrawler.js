//"use strict";
var request = require('request');
var cheerio = require('cheerio');
var url = require('url');

module.exports = {
  getJson: function (myid, callback) {
  	console.log(myid);
    request(myid, function(error, response, html) {
    	if (!error) {
    		var $ = cheerio.load(html);
    		var parsed =  url.parse(myid);
    		var slashes = parsed.slashes?'//':'';
    		iconPath = $('link[rel="shortcut icon"]').attr('href');
    		if (iconPath) {
	    		iconPathParsed = url.parse(iconPath);
	    		if (!iconPathParsed.host) {
	    			iconPath = parsed.protocol + slashes + parsed.host + iconPath;
	    		}
    		} else {
    			iconPath = 'https://www.google.com/s2/favicons?domain=' + parsed.host;
    		}
    		iconPath = 'https://www.google.com/s2/favicons?domain=' + parsed.host;
    		json = { title : $('title').text() , icon : iconPath , searchUrl : parsed.host};
    		console.log(json);
    		callback(json);
    	}
    })
  }
};
