var gm = require('gm');
var loaderUtils = require('loader-utils');

module.exports = loader;
module.exports.raw = true;

function loader(source) {
    this.cacheable();
    var callback = this.async();
    var query = loaderUtils.parseQuery(this.query);

    var image = gm(source);

    if (query.resize) {
        image.resize.apply(image, query.resize);
    }

    if (query.quality) {
        image.quality(query.quality);
    }

    image.toBuffer(function (err, buffer) {
        callback(err, buffer);
    });
}
