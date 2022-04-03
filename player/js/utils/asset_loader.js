var fs = require("fs");

var assetLoader = (function () {
  function loadAsset(path, callback, errorCallback) {
    try {
      var data = fs.readFileSync(path, "utf-8");
      const body = JSON.parse(data);
      callback(body);
    } catch (err) {
      errorCallback(err);
    }
  }

  return {
    load: loadAsset,
  };
})();
