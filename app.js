var express = require('express')
var app = express();
var fs = require('fs');
var path = require('path');
var uuid = require('uuid');
var os = require('os');
var bodyParser = require('body-parser');  // parser for post requests

app.use(express.static('./public')); // load UI from public folder
app.use(bodyParser.json({limit: '5mb'}));

/**
 * Classifies an image
 * @param req.file The image file.
 */
app.post('/api/classify', function (req, res) {
  var images_file;
  if (req.body.image_data) {
    // write the base64 image to a temp file
    var resource = parseBase64Image(req.body.image_data);
    var temp = path.join(os.tmpdir(), uuid.v1() + '.' + resource.type);
    fs.writeFileSync(temp, resource.data);
    images_file = temp;
    console.log(images_file);
  } else {
    return res.json(res.status(400).json({ error: 'Meh', code: 400 }));
  }
  
});

/**
 * Parse a base 64 image and return the extension and buffer
 * @param  {String} imageString The image data as base64 string
 * @return {Object}             { type: String, data: Buffer }
 */
function parseBase64Image(imageString) {
  var matches = imageString.match(/^data:image\/([A-Za-z-+\/]+);base64,(.+)$/);
  var resource = {};

  if (matches.length !== 3) {
    return null;
  }

  resource.type = matches[1] === 'jpeg' ? 'jpg' : matches[1];
  resource.data = new Buffer(matches[2], 'base64');
  return resource;
}

module.exports = app;