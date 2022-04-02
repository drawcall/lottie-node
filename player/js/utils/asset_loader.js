var fs = require("fs");

var assetLoader = (function () {
  function loadAsset(path, callback, errorCallback) {
    fs.readFile(path, (err, data) => {
      if (err) {
        errorCallback(err);
      } else {
        const body = JSON.parse(data);
        callback(body);
      }
    });
  }
  return {
    load: loadAsset,
  };
})();
