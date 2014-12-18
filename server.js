var cloudinary = require('cloudinary');
var express = require('express');
var app = express();
var multer = require('multer');
app.use(multer({
    dest: './uploads/'
}));
app.use(express.static('./'));
var MongoClient = require('mongodb').MongoClient;
var collection = null;
// Connect to the db
MongoClient.connect("mongodb://root:root@linus.mongohq.com:10097/Grade", function(err, db) {
    if (!err) {
        console.log("We are connected");
        collection = db.collection('image1234');
    }
});
cloudinary.config({
    cloud_name: 'mixboxs',
    api_key: '783544822556447',
    api_secret: 'f6vdNs2EXeQGQ5puCRTWqiD0Emw'
});
app.post('/upload', function(req, res) {
    cloudinary.uploader.upload(req.files.pic.path, function(result) {
        var img = {
            url: result.url
        };
        console.log(result);
        collection.insert(img, function(err, result) {
            if (err) {
                throw err;
            } else {
                res.redirect('./index.html');
            }
        })
    });
});

app.post('/images', function(request, res) {
  collection.find().toArray(function(err, results) {
    res.send(results);
  });
});
app.listen(3100);